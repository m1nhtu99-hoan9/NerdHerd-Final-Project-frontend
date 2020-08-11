import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Content } from 'native-base'
import { SharedElement } from 'react-native-shared-element'
import { useNavigation } from '@react-navigation/native'
import Animated, { useCode } from 'react-native-reanimated'

import LoginForm from '../components/LoginForm'
import { Dashline, GradientContainer } from '../components/atomic/index'
import { SignInNavContext } from '../contexts'
import { runTiming } from '../utils/reanimated'

const { Value, set } = Animated

export default function LoginScreen() {
  const logoFontSize = useState(new Value(0))[0]

  const nav = useNavigation()
  const _transit = () => {
    nav.goBack()
  }

  /**@TODO on the first run, shrink the logo font size
   */
  useCode(
    // @ts-ignore
    set(logoFontSize, runTiming(80, 60)),
    [],
  )

  return (
    <GradientContainer flexDirection={'column'}>
      <Content contentContainerStyle={styles.contentContainer}>
        <Dashline top />
        <SharedElement id="logo">
          <Animated.Text
            onPress={_transit}
            style={{ ...styles.logo, fontSize: logoFontSize }}
          >
            Crescorex
          </Animated.Text>
        </SharedElement>
        <Dashline bottom />
        <SignInNavContext.Provider value={nav}>
          <LoginForm />
        </SignInNavContext.Provider>
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
