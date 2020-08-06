import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import 'react-native-gesture-handler'
import { BottomTabParamList } from '../../src/@types/navigation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//Import Screens
import { HomeScreen } from '../screens/index'
import { InformationScreen } from '../screens/index'

const Tab = createBottomTabNavigator<BottomTabParamList>()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Index">
      <Tab.Screen name="Index" component={HomeScreen} />
      <Tab.Screen name="Search" component={HomeScreen} />
      <Tab.Screen name="Profile" component={InformationScreen} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator;
