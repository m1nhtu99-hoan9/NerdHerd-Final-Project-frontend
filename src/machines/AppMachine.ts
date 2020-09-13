import { Machine, StateNodeConfig } from 'xstate'
import {
  AppMachineContext,
  AppMachineEvent,
  AppMachineStateSchema,
} from '../@types/machines'
import { entryActions } from './appActions'

const AppMachine = Machine<
  AppMachineContext,
  AppMachineStateSchema,
  AppMachineEvent
>({
  id: 'app',
  initial: "UNAUTHORISED",
  context: {
    searchHistory: [],
    token: "",
    userProfile: {},
  },
  states: {
    "UNAUTHORISED": {
      // by default, context is reset everytime the program transit to this state.
      entry: entryActions("resetContext"),
      on: {
        "Login": {
          // invoke login promise as a state machine
          target: "AUTHENTICATING"
        }
      }
    },
    "AUTHENTICATING": {
      /* invoke login promise here:
         in case of success, transit to "LOGGED_IN",
         else, transit back to "UNAUTHORISED".
      */
    },
    "LOGGED_IN": {
      /* When the program is at this state, automatically persist user's access token, 
         list of searched customers' phone number and user's profile data. Then, immediately
         transit to "NORMAL" state.
      */
    }, 
    "NORMAL": {
      /* As the named suggested, nothing happens here. */
    }, 
    "FAILURE": {
      /* Nothing happens here */
    },
    "SEARCH_HISTORY_UPDATED": {},
    "PROFILE_UPDATED": {},
  }
})

export default AppMachine
