import React from 'react'
import {
  createSharedElementStackNavigator,
  SharedElementCompatRoute,
} from 'react-navigation-shared-element'
import WelcomeScreen from '../../screens/Welcome'
import LoginScreen from '../../screens/LoginScreen'

/* Reference:
https://github.com/IjzerenHein/react-navigation-shared-element/blob/master/docs/Navigation5.md
*/

const Stack = createSharedElementStackNavigator()

export default function WelcomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" headerMode="none">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        sharedElements={(
          route: SharedElementCompatRoute,
          otherRoute: SharedElementCompatRoute,
          showing: boolean,
        ) => {
          const { id } = route.params
          return [
          {
            id,
            animation: 'fade-out',
            resize: 'clip',
            align: 'center-top',
          },
        ]}}
      />
    </Stack.Navigator>
  )
}
