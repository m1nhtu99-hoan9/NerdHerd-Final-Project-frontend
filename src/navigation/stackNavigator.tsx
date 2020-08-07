import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StackParamList } from '../../src/@types/navigation'
import BottomTabNavigator from './bottomTabNavigator'

import { LoginScreen, ChangePasswordScreen } from '../screens/index'
import { Fab } from 'native-base'

const Stack = createStackNavigator<StackParamList>()

// LogIn <-> Home <-> ChangePassword
const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={LoginScreen}
        initialParams={{}}
      />
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
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
