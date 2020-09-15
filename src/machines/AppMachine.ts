import { Machine, StateNodeConfig, assign } from 'xstate'
import {
  AppMachineContext,
  AppMachineEvent,
  AppMachineStateSchema,
} from '../@types/machines'
import { resetContext, persistRejectedMessage } from './appActions'
import { isSuccessResp, isNotSuccessResp, isTokenEmpty } from './appGuards'

import {
  asyncLogout,
  asyncLogin,
  asyncGetCrescore,
  asyncGetUserProfile,
  asyncGetOtp,
  asyncRegister,
} from './API'

const AppMachine = Machine<
  AppMachineContext,
  AppMachineStateSchema,
  AppMachineEvent
>({
  id: 'app',
  initial: 'UNAUTHORISED',
  context: {
    /* initial context */
    searchHistory: [],
    token: '',
    userProfile: {},
    lastResponse: {
      statusCode: -1,
      lastErrorMessage: '',
    },
  },
  states: {
    UNAUTHORISED: {
      // @ts-ignore; by default, context is reset everytime the program transit to this state.
      entry: resetContext,
      on: {
        Login: {
          // invoke login promise as a state machine
          target: 'AUTHENTICATING',
        },
      },
    },
    AUTHENTICATING: {
      /* invoke login promise here:
         in case of success, transit to "LOGGED_IN",
         else, transit to "FAILURE" 
         ("FAILURE" implies that `context.lastResponse.lastErrorMessage` is not empty,
          while "UNAUTHORISED" implies that that context field is empty).
      */

      // @ts-ignore
      invoke: {
        id: 'login_promise',
        src: (_, event) =>
          asyncLogin(event.phoneNum as string, event.password as string),
        onDone: [
          {
            /* in case of 200's response */
            cond: isSuccessResp,
            target: 'LOGGED_IN',
            actions: assign({
              // `event.data` returns an object complying to interface `ApiOkResponse`
              token: (_, event) => event.data.data.jwt,
              lastResponse: (_, event) => {
                return { statusCode: event.data.status, lastErrorMessage: '' }
              },
            }),
          },
          {
            /* other types of response */
            cond: isNotSuccessResp,
            target: 'FAILURE',
            actions: assign({
              lastResponse: (_, event) => {
                const statusCode = event.data.status
                const respData = event.data.data

                return {
                  statusCode,
                  lastErrorMessage:
                    statusCode >= 500
                      ? 'Mật khẩu sai'
                      : (Object.values(respData)[0] as string),
                }
              },
            }),
          },
        ],
        onError: {
          target: 'FAILURE',
          actions: assign<AppMachineContext, AppMachineEvent>({
            // for rejected promises, `event.data` returns error message
            lastResponse: (ctx, event) => {
              return { ...ctx.lastResponse, lastErrorMessage: event.data }
            },
          }),
        },
      },
    },
    FAILURE: {
      on: {
        Logout: { target: 'UNAUTHORISED' },
        Login: { target: 'AUTHENTICATING' },
      },
    },
    
    LOGGED_IN: {
      //always: [{ cond: 'isTokenEmpty', target: 'UNAUTHORISED' }],
      on: {
        Logout: { target: 'UNAUTHORISED' },
      },
    },
    INVOKING_PROFILE_PROMISE: {
      /* invoke login promise here:
         in case of success, transit to "PROFILE_UPDATED",
         else, transit to "FAILURE".
      */

      // @ts-ignore
      invoke: {
        id: 'profile_promise',
        src: (ctx, event) => asyncGetUserProfile(ctx.token as string),
        onDone: [
          {
            /* in case of 200's response */
            cond: isSuccessResp,
            target: 'LOGGED_IN',
            actions: assign({
              // `event.data` returns an object complying to interface `ApiOkResponse`
              token: (_, event) => event.data.data.jwt,
              lastResponse: (_, event) => {
                return { statusCode: event.data.status, lastErrorMessage: '' }
              },
            }),
          },
          {
            /* other types of response */
            cond: isNotSuccessResp,
            target: 'FAILURE',
            actions: assign({
              lastResponse: (_, event) => {
                const statusCode = event.data.status
                const respData = event.data.data

                return {
                  statusCode,
                  lastErrorMessage:
                    statusCode >= 500
                      ? 'Internal server error'
                      : (Object.values(respData)[0] as string),
                }
              },
            }),
          },
        ],
        onError: {
          target: 'FAILURE',
          actions: assign<AppMachineContext, AppMachineEvent>({
            // for rejected promises, `event.data` returns error message
            lastResponse: (ctx, event) => {
              return { ...ctx.lastResponse, lastErrorMessage: event.data }
            },
          }),
        },
      },
    },
  },
  PROFILE_UPDATED: {},
  PREPARING_HOME_SCREEN: {
    /* invoke multiple crescore promises to query credit score of each 
         phone number in search history */
  },
  READY: {
    /* HomeScreen is ready to display */
    on: {
      Logout: { target: 'UNAUTHORISED' },
    },
  },
  INVOKING_OTP_PROMISE: {},
  OTP_UPDATED: {},
  INVOKING_CRESCORE_PROMISE: {},
  SEARCH_HISTORY_UPDATED: {},
  LOGGING_OUT: {
    /* request the server to revoke current user token */
    invoke: {
      id: 'logout_promise',
      src: (ctx: AppMachineContext) => asyncLogout(ctx.token as string),
      onDone: {
        target: 'UNAUTHORISED',
        actions: resetContext,
      },
      onError: {
        target: 'FAILURE',
        actions: persistRejectedMessage,
      },
    },
  },

})

export default AppMachine
