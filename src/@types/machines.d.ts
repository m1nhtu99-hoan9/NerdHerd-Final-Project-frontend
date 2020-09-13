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

/* after every changes made on `AppMachineEvent`, 
  `TAppMachineSender` has to be edited accordingly */
export interface AppMachineEvent extends EventObject, DoneEventObject {
  type: 'Login'
  payload?: object
}

/** Type of `AppMachine` */
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
  payload?: EventData | undefined,
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
