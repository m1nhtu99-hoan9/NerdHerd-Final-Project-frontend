import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import LoginScreen from './src/screens/LoginScreen'
import { HomeScreen } from './src/screens/index'
import { NavigationContainer } from '@react-navigation/native'
import { BottomTabNavigator, StackNavigator } from './src/navigation/index'

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
