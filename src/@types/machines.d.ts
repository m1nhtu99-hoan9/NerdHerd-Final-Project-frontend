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
  otp?: string
  userProfile: TUserProfile
  lastResponse: {
    statusCode: number
    lastErrorMessage: string
  }
}

export interface AppMachineStateSchema extends StateSchema {
  states: {
    /* unauthorised access due to invalid or missing token or not
         being logged in yet both falls into this state */
    UNAUTHORISED: {}
    AUTHENTICATING: {}
    LOGGED_IN: {}
    /* to get data to display in HomeScreen (search history) 
         & InformationScreen */
    PROFILE_FETCHING: {}
    /* HomeScreen & InformationScreen are ready to display */
    READY: {}
    OTP_FETCHING: {}
    OTP_UPDATED: {}
    CRESCORE_QUERYING: {}
    LOGGING_OUT: {}
    FAILURE: {}
  }
}

/* after every changes made on `AppMachineEvent`, 
  `TAppMachineSender` has to be edited accordingly */
export interface AppMachineEvent extends EventObject, DoneEventObject {
  type: 'Login' | 'Logout' | 'RequestOtp' | 'QueryScore' 
  phoneNum?: string
  password?: string
  token?: string
  inputOtp?: string
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
    | 'Login' | 'Logout' | 'RequestOtp' | 'QueryScore'
    | SCXML.Event<AppMachineEvent>
    | Event<AppMachineEvent>[],
  phoneNum?: EventData | undefined,
  password?: EventData | undefined,
  token?: EventData | undefined,
  inputOtp?: EventData | undefined
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
