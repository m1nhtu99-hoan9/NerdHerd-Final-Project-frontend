import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import 'react-native-gesture-handler'
import { BottomTabParamList } from '../../src/@types/navigation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//Import Screens
import { HomeScreen } from '../screens/index'
import { InformationScreen } from '../screens/index'
import styles from '../styles'

const Tab = createBottomTabNavigator<BottomTabParamList>()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Index"
      tabBarOptions={{
        style: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          elevation: 0
        },
      }}
    >
      <Tab.Screen name="Index" component={HomeScreen} />
      <Tab.Screen name="Search" component={HomeScreen} />
      <Tab.Screen name="Profile" component={InformationScreen} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
