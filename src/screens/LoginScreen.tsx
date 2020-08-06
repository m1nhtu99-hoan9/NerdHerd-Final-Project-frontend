import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Content } from 'native-base'
import LoginForm from '../components/LoginForm'

export default function LoginScreen() {
  return (
    <LinearGradient colors={['#017DDC', '#00BCA0']} style={styles.container}>
      <Content contentContainerStyle={styles.contentContainer}>
        <Line />
        <Text style={styles.logo}>Crescorex</Text>
        <Line />
        <LoginForm />
      </Content>
    </LinearGradient>
  )
}

const Line = () => {
  return <View style={styles.whiteLine}></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100
  },
  whiteLine: {
    backgroundColor: 'white',
    height: 6,
    width: 77 + '%',
    borderRadius: 20,
    marginVertical: 10,
  },
  logo: {
    color: 'white',
    fontSize: 40,
  }
})
