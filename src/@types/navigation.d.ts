import { type } from 'ramda'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export const Stack = createStackNavigator<StackParamList>()
export const Tab = createBottomTabNavigator<BottomTabParamList>()

export type StackParamList = {
  Login: { name: number }
  Home: { userId: string }
  ChangePassword: { userId: string }
}

export type BottomTabParamList = {
  Index: { userId: string }
  Search: undefined
  Profile: { userId: string }
}
