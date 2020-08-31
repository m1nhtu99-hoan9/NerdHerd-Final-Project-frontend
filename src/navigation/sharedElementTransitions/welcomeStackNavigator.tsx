import React from 'react'
import {
  createSharedElementStackNavigator,
  SharedElementCompatRoute,
} from 'react-navigation-shared-element'

import { WelcomeStackParamList } from '../../@types/navigation'
import WelcomeScreen from '../../screens/Welcome'
import LoginScreen from '../../screens/LoginScreen'
import { ForgotPasswordScreen, SignUpScreen } from '../../screens/'

/* Reference:
https://github.com/IjzerenHein/react-navigation-shared-element/blob/master/docs/Navigation5.md
*/

const Stack = createSharedElementStackNavigator<WelcomeStackParamList>()

export default function WelcomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" headerMode="none">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        sharedElements={(
          route: SharedElementCompatRoute,
          otherRoute: SharedElementCompatRoute,
          showing: boolean,
        ) => {
          return [
            {
              id: 'logo',
              animation: 'fade',
            },
          ]
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          gestureEnabled: false,
        }}
        sharedElements={(
          route: SharedElementCompatRoute,
          otherRoute: SharedElementCompatRoute,
          showing: boolean,
        ) => {
          return [
            {
              id: 'logo',
              animation: 'fade',
            },
          ]
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        sharedElements={(
          route: SharedElementCompatRoute,
          otherRoute: SharedElementCompatRoute,
          showing: boolean,
        ) => {
          return [
            {
              id: 'logo',
              animation: 'fade',
            },
          ]
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        sharedElements={(
          route: SharedElementCompatRoute,
          otherRoute: SharedElementCompatRoute,
          showing: boolean,
        ) => {
          return [
            {
              id: 'logo',
              animation: 'fade',
            },
          ]
        }}
      />
    </Stack.Navigator>
  )
}

/** @Diary
 * 11/08/20:
 *    the shared transition is just a normal stack transition
 *    idea for improvement: reference from here [https://github.com/IjzerenHein/react-navigation-shared-element-demo]
 *
 */
