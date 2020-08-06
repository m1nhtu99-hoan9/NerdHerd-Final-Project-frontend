import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AnimatedLoginScreen from './src/components/animated/firstLauch'

import LoginScreen from './src/screens/LoginScreen'
import {HomeScreen} from './src/screens/index'
import { NavigationContainer } from '@react-navigation/native'
import { BottomTabNavigator} from './src/navigation/index'

export default function App() {
  return (
    <NavigationContainer>
        <BottomTabNavigator />
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
