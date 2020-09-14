import {
  EventObject,
  StateSchema,
  DoneEventObject,
  MachineConfig,
  ActionObject,
  StateMachine,
  Interpreter,
  Event,
  EventData,
  SCXML,
} from 'xstate'

export type TUserProfile = {
  phone?: PhoneNum | undefined
  fullName?: string | undefined
  bankId?: string | undefined
  userId?: string | undefined
  email?: string | undefined
}
export interface AppMachineContext {
  searchHistory?: Array<SearchResult>
  token?: string
  // either empty object or object with schema as stated below
  userProfile: TUserProfile
  lastResponse: {
    statusCode: number
    lastErrorMessage: string
  }
}

export interface AppMachineStateSchema extends StateSchema {
  states: {
    UNAUTHORISED: {
      /* unauthorised access due to invalid or missing token or not
         being logged in yet both falls into this state */
    }
    AUTHENTICATING: {}
    LOGGED_IN: {}
    INVOKING_PROFILE_PROMISE: {}
    PROFILE_UPDATED: {}
    PREPARING_HOME_SCREEN: {
      /* invoke multiple crescore promises to query credit score of each 
         phone number in search history */
    }
    READY: {
      /* HomeScreen is ready to display */
    }
    INVOKING_OTP_PROMISE: {}
    OTP_UPDATED: {}
    INVOKING_CRESCORE_PROMISE: {}
    SEARCH_HISTORY_UPDATED: {}
    LOGGING_OUT: {}
    FAILURE: {}
  }
}

/* after every changes made on `AppMachineEvent`, 
  `TAppMachineSender` has to be edited accordingly */
export interface AppMachineEvent extends EventObject, DoneEventObject {
  type: 'Login' | 'Logout'
  phoneNum?: string
  password?: string
}

/** Type of `AppMachine` */

export type AppActionObject = ActionObject<
  AppMachineContext,
  AppMachineStateSchema,
  AppMachineEvent
>

export type TAppMachine = StateMachine<
  AppMachineContext,
  AppMachineStateSchema,
  AppMachineEvent,
  any
>
export type InterpreterAppMachine = Interpreter<
  AppMachineContext,
  AppMachineStateSchema,
  AppMachineEvent,
  any
>

/** Type definitions for AppMachine service hook */
export type TAppMachineState = State<
  AppMachineContext,
  AppMachineEvent,
  any,
  { value: any; context: AppMachineContext }
>
export type TAppMachineSender = (
  event:
    | AppMachineEvent
    | 'Login'
    | SCXML.Event<AppMachineEvent>
    | Event<AppMachineEvent>[],
  phoneNum?: EventData | undefined,
  password?: EventData | undefined,
) => TAppMachineState
export interface OtpMachineContext {
  otp?: string
}

export interface OtpMachineStateScheme extends StateSchema {
  states: {
    IDLE: {}
    REQUEST_SENT: {}
    RESOLVING_REQUEST: {}
    OTP_RECEIVED: {}
    FAILURE: {}
  }
}

export interface OtpMachineEvent extends EventObject, DoneEventObject {
  type: 'SendRequest'
}
