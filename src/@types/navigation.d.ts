

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
