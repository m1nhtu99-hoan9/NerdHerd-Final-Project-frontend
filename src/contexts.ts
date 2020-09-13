import React, { createContext } from 'react'
import { ParamListBase } from '@react-navigation/routers'
import { NavigationProp } from '@react-navigation/native'

import { State } from 'xstate'
import { TAppMachineState, TAppMachineSender } from './@types/machines'

/* initiate `SignInNavContext` with a pseudo Screen's navigation object */
const SignInNavContext = createContext({} as NavigationProp<ParamListBase>)
/* initiate `AppMachineContext` with a pseudo `AppMachine` service hooks */
const AppMachineContext = createContext([
  {} as TAppMachineState,
  new Function() as TAppMachineSender,
])

export { SignInNavContext, AppMachineContext }
