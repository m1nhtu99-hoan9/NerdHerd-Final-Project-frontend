import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Container } from 'native-base'

import { LoginScreen } from './src/screens/index'

export default function App() {
  return (
    <Container style={styles.container}>
      <LoginScreen />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
