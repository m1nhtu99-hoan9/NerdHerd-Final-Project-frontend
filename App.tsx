import React from 'react'
import { AppLoading } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import LoginScreen from './src/screens/LoginScreen'
import { HomeScreen } from './src/screens/index'
import { NavigationContainer } from '@react-navigation/native'
import { BottomTabNavigator, StackNavigator } from './src/navigation/index'

import {
  useFonts
} from 'expo-font'

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    ComfortaaRegular: require('./assets/fonts/Comfortaa-Regular.ttf'),
    ComfortaaBold: require('./assets/fonts/Comfortaa-Bold.ttf'),
  })

  return !fontsLoaded ? (
    <AppLoading />
  ) : (
    <NavigationContainer>
      {/* current initial route: Home */}
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
