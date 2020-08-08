import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Container, Header, Content, View } from 'native-base'
import LoginForm from '../components/LoginForm'

import { Dashline, GradientContainer } from '../components/atomic/index'

export default function LoginScreen() {
  return (
    <GradientContainer flexDirection={'column'}>
      <Content contentContainerStyle={styles.contentContainer}>
        <Dashline top />
        <Text style={styles.logo}>Crescorex</Text>
        <Dashline bottom />
        <LoginForm/>
      </Content>
    </GradientContainer>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: 'white',
    fontSize: 56,
    shadowOffset: {
      width: -3,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  }
})
