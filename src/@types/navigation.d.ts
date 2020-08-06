/* Type Definitions */
import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RouteProp } from '@react-navigation/native'

/* @Reference:  
    https://github.com/mnhthng-thms/News-Feeder-ReactNative/blob/master/src/%40types/navigation.d.ts
*/
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

export type LoginScreenNavigationProps = StackNavigationProp<
  StackParamList,
  'Login'
>
export type HomeScreenNavigationProps = StackNavigationProp<
  StackParamList,
  'Home'
>
export type ChangePasswordNavigationProps = StackNavigationProp<
  StackParamList,
  'ChangePassword'
>

export type IndexScreenNavigationProp = BottomTabNavigationProp<
  BottomTabParamList, 
  'Index'
>
export type SearchScreenNavigationProp = BottomTabNavigationProp<
  BottomTabParamList, 
  'Search'
>
export type ProfileScreenNavigationProp = BottomTabNavigationProp<
  BottomTabParamList, 
  'Profile'
>
