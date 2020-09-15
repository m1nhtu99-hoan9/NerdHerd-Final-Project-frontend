import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StackParamList } from '../../src/@types/navigation'
import BottomTabNavigator from './bottomTabNavigator'

import { LoginScreen, ChangePasswordScreen } from '../screens/index'
import WelcomeStackNavigator from './sharedElementTransitions/welcomeStackNavigator'

const Stack = createStackNavigator<StackParamList>()

// LogIn <-> Home <-> ChangePassword
const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{ headerShown: false, gestureEnabled: false }}
        component={WelcomeStackNavigator}
        initialParams={{}}
      />
      <Stack.Screen
        name="Home"
        options={{ headerShown: false, gestureEnabled: false }}
        component={BottomTabNavigator}
        initialParams={{}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        initialParams={{}}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator
