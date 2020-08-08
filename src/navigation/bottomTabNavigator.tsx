import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BottomTabParamList } from '../../src/@types/navigation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, AntDesign } from '@expo/vector-icons'

import { HomeScreen, InformationScreen, SearchScreen } from '../screens/index'

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
        component={SearchScreen}
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
