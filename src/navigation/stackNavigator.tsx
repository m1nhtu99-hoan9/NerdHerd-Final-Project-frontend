import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StackParamList } from '../../src/@types/navigation'
import BottomTabNavigator from './bottomTabNavigator'

//Import Screens
import { LoginScreen, ChangePasswordScreen } from '../screens/index'

const Stack = createStackNavigator<StackParamList>()

const StackNavigator = () => {
  return (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login">{() => <LoginScreen />}</Stack.Screen>
          <Stack.Screen
            name="Home"
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

export default StackNavigator;
