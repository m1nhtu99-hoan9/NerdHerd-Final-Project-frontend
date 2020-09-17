import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeStackParamList } from '../../src/@types/navigation'
import { SearchScreen, SearchResultScreen } from '../screens/'

const Stack = createStackNavigator<HomeStackParamList>()

/**Navigation stack between `Search` screen & `SearchResult` screen */
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
      />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator
