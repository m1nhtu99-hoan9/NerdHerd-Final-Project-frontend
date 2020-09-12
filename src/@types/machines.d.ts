import {
  EventObject,
  StateSchema,
  DoneEventObject,
  MachineConfig,
  ActionObject,
} from 'xstate'

export interface AppMachineContext {
  searchHistory?: Array<SearchResult>
  token?: string
  // either empty object or object with schema as stated below
  userProfile:
    | {}
    | {
        phone: PhoneNum
        fullName: string
        bankId: string
        userId: string
        email: string
      }
}

export type AppActionObject = ActionObject<
  AppMachineContext,
  AppMachineStateSchema,
  AppMachineEvent
>

export interface AppMachineStateSchema extends StateSchema {
  states: {
    /* unauthorised access due to invalid or missing token or not being logged in yet 
       bothfalls into this state */
    UNAUTHORISED: {}
    AUTHENTICATING: {}
    LOGGED_IN: {}
    NORMAL: {}
    SEARCH_HISTORY_UPDATED: {}
    PROFILE_UPDATED: {}
    FAILURE: {}
  }
}

export interface AppMachineEvent extends EventObject, DoneEventObject {
  type: 'Login'
  payload?: object
}

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
