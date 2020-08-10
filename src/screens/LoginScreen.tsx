import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Content } from 'native-base'
import { useRoute } from '@react-navigation/native' 
import { SharedElement } from 'react-native-shared-element'
import LoginForm from '../components/LoginForm'

import { Dashline, GradientContainer } from '../components/atomic/index'

export default function LoginScreen() {
  const route = useRoute()
  const { id } = route.params 

  return (
    <GradientContainer flexDirection={'column'}>
      <Content contentContainerStyle={styles.contentContainer}>
        <Dashline top />
        <SharedElement id={id}>
          <Text style={styles.logo}>Crescorex</Text>
        </SharedElement>
        <Dashline bottom />
        <LoginForm />
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
  },
})
