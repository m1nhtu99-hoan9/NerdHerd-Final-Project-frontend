import { type } from "ramda";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export const Stack = createStackNavigator<StackParamList>();
export const Tab = createBottomTabNavigator<BottomTabParamList>();

type StackParamList = {
    Login: {name : number}
    Home: {userId: string};
    ChangePassword: {userId: string}
}

type BottomTabParamList = {
    Index: {userId : string}
    Search: undefined
    Profile: {userId : string}
}