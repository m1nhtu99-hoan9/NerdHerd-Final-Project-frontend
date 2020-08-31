/* Type Definitions */
import { ParamListBase } from '@react-navigation/routers'
import { NavigationProp } from '@react-navigation/native'
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

export type HomeStackParamList = {
  Search: undefined
  SearchResult: { phone: number | undefined }
}

export type WelcomeStackParamList = {
  Welcome: undefined
  Login: undefined
  SignUp: undefined
  ForgotPassword: undefined
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

export type SearchScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  'Search'
>

export type SearchResultScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  'SearchResult'
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

export type WelcomeScreenNavigationProps = StackNavigationProp<
  WelcomeStackParamList,
  'Welcome'
>
export type LoginScreenNavigationProps = StackNavigationProp<
  WelcomeStackParamList,
  'Login'
>
export type SignUpScreenNavigationProps = StackNavigationProp<
  WelcomeStackParamList,
  'SignUp'
>
export type ForgotPasswordScreenNavigationProps = StackNavigationProp<
  WelcomeStackParamList,
  'ForgotPassword'
>

export type ScreenNavigation = NavigationProp<ParamListBase>
