import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeStackParamList } from '../../src/@types/navigation'
import { SearchScreen, SearchResultScreen, ApprovalScreen } from '../screens/'

const Stack = createStackNavigator<HomeStackParamList>()

/**Navigation stack between `Search` screen & `SearchResult` screen */
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Approval">
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
      <Stack.Screen
        name="Approval"
        options={{ headerShown: false }}
        component={ApprovalScreen}
        initialParams={{phone: undefined}}
      />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator
