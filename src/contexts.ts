import React, { createContext } from 'react'
import { ParamListBase } from '@react-navigation/routers'
import { NavigationProp } from '@react-navigation/native'

/**@todo initiates SignInNavContext with a pseudo Screen's navigation object */
const SignInNavContext = createContext({
  navigate: (...args: any[]) => {
    return
  },
} as NavigationProp<ParamListBase>)

export { SignInNavContext }
