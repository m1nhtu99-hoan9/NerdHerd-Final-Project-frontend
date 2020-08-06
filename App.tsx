import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

//import HomeScreen from './src/screens/HomeScreen'
import { HomeScreen, SingupScreen, LoginScreen } from './src/screens/index'
import { BottomTabNavigator } from './src/navigation/index'
import { StackNavigator } from './src/navigation/index'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
