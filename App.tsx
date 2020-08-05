import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

//import HomeScreen from './src/screens/HomeScreen'
import { LoginScreen } from './src/screens/index'
import { BottomTabNavigator } from './src/navigation/index'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>OK</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
