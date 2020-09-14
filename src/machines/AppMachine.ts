import { Machine, StateNodeConfig,assign } from 'xstate'
import {
  AppMachineContext,
  AppMachineEvent,
  AppMachineStateSchema,
} from '../@types/machines'
import { entryActions } from './appActions'

import { ApiOkResponse } from 'apisauce'
import { asyncLogout, asyncLogin } from './API'

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
  },
  states: {
    UNAUTHORISED: {
      // by default, context is reset everytime the program transit to this state.
      entry: entryActions('resetContext'),
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
         else, transit back to "UNAUTHORISED".
      */
      invoke: {
        id: 'login_promise',
        // @ts-ignore <HORRIBLE ERROR MAY HAPPEND HERE>
        src: (_, event) => asyncLogin(event.phoneNum, event.password),
        onDone: {
          target: 'LOGGED_IN',
          actions: assign({
            // `event.data` returns an object complying to interface `ApiOkResponse`
            token: (_, event) => (event.data).data.jwt
          })
        },
        onError: {
          target: 'FAILURE'
        }
      },
    },
    LOGGED_IN: {
      type: 'final' // <TEMPORARY>
    },
    INVOKING_PROFILE_PROMISE: {},
    PROFILE_UPDATED: {},
    PREPARING_HOME_SCREEN: {
      /* invoke multiple crescore promises to query credit score of each 
         phone number in search history */
    },
    READY: {
      /* HomeScreen is ready to display */
      type: 'final' // <TEMPORARY>
    },
    INVOKING_OTP_PROMISE: {},
    OTP_UPDATED: {},
    INVOKING_CRESCORE_PROMISE: {},
    SEARCH_HISTORY_UPDATED: {},
    FAILURE: {
      type: 'final' // <TEMPORARY>
    },
  },
})

export default AppMachine
