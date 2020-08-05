import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { Stack } from '../../src/@types/navigation'
import BottomTabNavigator from './bottomTabNavigator'

//Import Screens
import {LoginScreen} from '../screens/index'
import ChangePasswordScreen from '../screens/ChangePasswordScreen'

const StackNavigator = () => {
  return (
    <View>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
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
      </NavigationContainer>
    </View>
  )
}

export default StackNavigator
