import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import 'react-native-gesture-handler'
import { BottomTabParamList } from '../../src/@types/navigation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//Import icon
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

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
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Index"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={InformationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
