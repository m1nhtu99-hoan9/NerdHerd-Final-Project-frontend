import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeStackParamList } from '../../src/@types/navigation'

import { SearchScreen } from '../screens/index';
import { SearchResultScreen } from '../screens/index';

const Stack = createStackNavigator<HomeStackParamList>()

// LogIn <-> Home <-> ChangePassword
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        options={{ headerShown: false }}
        component={SearchScreen}
      />
      <Stack.Screen
        name="SearchResult"
        options={{ headerShown: false }}
        component={SearchResultScreen}
        initialParams={{phone: undefined}}
      />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator
