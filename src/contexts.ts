import React, { createContext } from 'react'

/**@todo initiates SignInNavContext with a pseudo Screen's navigation object */
const SignInNavContext = createContext({
  navigate: (...args: any[]) => {
    return
  },
})

export { SignInNavContext }
