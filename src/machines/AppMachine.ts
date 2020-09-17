import { Machine, assign } from 'xstate'
import {
  AppMachineContext,
  AppMachineEvent,
  AppMachineStateSchema,
  TUserProfile,
} from '../@types/machines'

import {
  isSuccessResp,
  isNotSuccessResp,
  isTokenEmpty,
  hasOtpNotLoaded,
} from './appGuards'
import {
  resetContext,
  persistUnsuccRespMessage,
  persistRejectedMessage,
  assignHandler,
  addSearchResultToHistory,
  resetOtp,
} from './appActions'

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
    otp: '',
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
              lastResponse: assignHandler.LastResponse,
            }),
          },
          {
            /* other types of response */
            cond: isNotSuccessResp,
            target: 'FAILURE',
            actions: persistUnsuccRespMessage,
          },
        ],
        onError: {
          /* in case the promise is rejected */
          target: 'FAILURE',
          actions: persistRejectedMessage,
        },
      },
    },
    LOGGED_IN: {
      always: [
        // just to be sure ya know       ｡*ﾟ.*.｡(っ ᐛ )っ
        { cond: isTokenEmpty, target: 'UNAUTHORISED' },
      ],
      on: {
        MoveOn: {
          target: 'PROFILE_FETCHING',
        },
      },
    },
    PROFILE_FETCHING: {
      /* invoke promise to request from '/profile' route here:
         in case of success, transit to `READY`,
         else, transit to `FAILURE`.
      */

      // @ts-ignore
      invoke: {
        id: 'profile_promise',
        /* to get data to display in HomeScreen (search history) 
         & InformationScreen */
        src: (ctx) => asyncGetUserProfile(ctx.token as string),
        onDone: [
          {
            /* in case of 200's response */
            cond: isSuccessResp,
            target: 'READY',
            actions: assign({
              searchHistory: assignHandler.SearchHistory,
              userProfile: assignHandler.UserProfile,
              lastResponse: assignHandler.LastResponse,
            }),
          },
          {
            /* other types of response */
            cond: isNotSuccessResp,
            target: 'FAILURE',
            actions: persistUnsuccRespMessage,
          },
        ],
        onError: {
          target: 'FAILURE',
          actions: persistRejectedMessage,
        },
      },
    },
    READY: {
      /* HomeScreen & InformationScreen is ready to display 
         (after user being logged in 
          or a credit score request being resolved successfully) */
      on: {
        Logout: { target: 'LOGGING_OUT' },
        RequestOtp: {
          // prevent user from sending excessive OTP requests
          cond: hasOtpNotLoaded,
          target: 'OTP_FETCHING',
        },
      },
    },
    OTP_FETCHING: {
      /* invoke promise to request OTP code */

      // @ts-ignore; TS too rigid (ó﹏ò｡)
      invoke: {
        id: 'otp_promise',
        src: (ctx) => asyncGetOtp(ctx.token as string),
        onDone: [
          {
            cond: isSuccessResp,
            target: 'OTP_UPDATED',
            actions: assign({
              otp: (_, event) => event.data.data.otp_code,
            }),
          },
          {
            cond: isNotSuccessResp,
            target: 'FAILURE',
            actions: persistUnsuccRespMessage,
          },
        ],
        onError: {
          target: 'FAILURE',
          actions: persistRejectedMessage,
        },
      },
    },
    OTP_UPDATED: {
      /* similar to `READY` but waiting for user to 
         send request to query customer's credit score */
      on: {
        /* in case user input wrong phone number 
           and want to retry with the desired number */
        RequestOtp: {
          target: 'OTP_FETCHING',
        },
        QueryScore: {
          /* if user's input OTP doesn't match OTP stored in context, 
             don't get to anywhere */
          cond: (ctx: AppMachineContext, event: AppMachineEvent) =>
            (ctx.otp == event.inputOtp) as boolean,
          target: 'CRESCORE_QUERYING',
        },
        Logout: {
          target: 'LOGGING_OUT',
        },
      },
    },
    CRESCORE_QUERYING: {
      /* invoke promise to query customer's credit score
         if success, transit to `READY`; else, transit to `OTP_UPDATED`
      */

      // @ts-ignore
      invoke: {
        id: 'crescore_promise',
        src: (ctx, event) =>
          asyncGetCrescore(ctx.token as string)(event.phoneNum as string),
        onDone: [
          {
            /* in case of 200's response */
            cond: isSuccessResp,
            target: 'READY',
            actions: [addSearchResultToHistory, resetOtp],
          },
          {
            /* in case of non-200's response */
            cond: isNotSuccessResp,
            target: 'OTP_UPDATED',
            actions: persistRejectedMessage,
          },
        ],
        onError: {
          target: 'OTP_UPDATED',
          actions: persistUnsuccRespMessage,
        },
      },
    },
    LOGGING_OUT: {
      /* @ts-ignore; request the server to revoke current user token */
      invoke: {
        id: 'logout_promise',
        src: (ctx: AppMachineContext) => asyncLogout(ctx.token as string),
        onDone: [
          {
            cond: isSuccessResp,
            target: 'UNAUTHORISED',
            actions: resetContext,
          },
          {
            /* for non-200's responses */
            cond: isNotSuccessResp,
            target: 'FAILURE',
            actions: persistUnsuccRespMessage,
          },
        ],
        onError: {
          target: 'FAILURE',
          actions: persistRejectedMessage,
        },
      },
    },
    FAILURE: {
      on: {
        /** events which can be sent from `UNAUTHORISED`, `LOGGED_IN`, `READY`
         *  can also be sent in this state
         */
        Logout: { target: 'UNAUTHORISED' },
        Login: { target: 'AUTHENTICATING' },
        RequestOtp: {
          // prevent user from sending excessive OTP requests
          cond: hasOtpNotLoaded,
          target: 'OTP_FETCHING',
        },
      },
    },
  },
})

export default AppMachine
