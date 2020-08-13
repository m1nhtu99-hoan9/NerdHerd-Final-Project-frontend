import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Content } from 'native-base'
import { SharedElement } from 'react-native-shared-element'
import { useNavigation } from '@react-navigation/native'

import { SignUpForm } from '../components/index'
import { Dashline, GradientContainer } from '../components/atomic/index'

//Import normalise
import { normalise } from '../../src/helpers/Constants'

export default function SignUpScreen() {
  const nav = useNavigation()
  const _transit = () => {
    nav.navigate('Login')
  }

  return (
    <GradientContainer flexDirection={'column'}>
      <Content contentContainerStyle={styles.contentContainer}>
        <Dashline top />
        <SharedElement id="logo">
          <Text onPress={_transit} style={styles.logo}>
            Crescorex
          </Text>
        </SharedElement>
        <Dashline bottom />
        <SignUpForm />
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
    fontSize: normalise(56),
    shadowOffset: {
      width: -3,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
})
