// @ts-nocheck
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native'
import Animated, { Easing, useCode } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import * as R from 'ramda'
import { translate } from 'i18n-js'

/* @References: 
    https://www.youtube.com/watch?v=hqbmv1yvndE&t=s
*/

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
} = Animated

const runTiming = (posValue: any, dest: any) => {
  const innerClock = new Clock()

  const state: Animated.TimingState = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  }

  const config: Animated.TimingConfig = {
    duration: 500,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.quad),
  }

  return block([
    cond(clockRunning(innerClock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, posValue),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(innerClock),
    ]),
    timing(innerClock, state, config),
    cond(state.finished, debug('stop clock', stopClock(innerClock))),
    state.position,
  ])
}

const runTimingReversed = R.flip(runTiming)

export default function AnimatedLoginScreen() {
  const logoFontSize = useState(new Value(0))[0]
  const isIntro = useState(true)

  useCode(
    set(logoFontSize, (isIntro ? runTiming : runTimingReversed)(65, 40))
  , [])

  return (
    <LinearGradient colors={['#017DDC', '#00BCA0']} style={styles.container}>
      <Line />
      <Animated.Text style={{ 
        ...styles.logo,
        fontSize: logoFontSize        
      }}>
        Crescorex
      </Animated.Text>
      <Line />
      <TextInput
        maxLength={20}
        style={styles.inputUsername}
        placeholder="Username"
        placeholderTextColor={'#bdbdbd'}
      />

      <TextInput
        maxLength={22}
        style={styles.inputPassword}
        placeholder="Password"
        placeholderTextColor={'#bdbdbd'}
        secureTextEntry
      />

      <Text style={styles.forgotText}>Forgot Password?</Text>

      <TouchableHighlight style={styles.buttonLogin}>
        <Text style={styles.loginText}>Log in</Text>
      </TouchableHighlight>
    </LinearGradient>
  )
}

const Line = () => {
  return <View style={styles.whiteLine}></View>
}

const styles = StyleSheet.create({
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
  },
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  inputUsername: {
    textAlign: 'center',
    width: 70 + '%',
    color: 'white',
    fontSize: 15,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#e3e3e3',
    borderRadius: 18,
    marginTop: 70,
  },
  inputPassword: {
    textAlign: 'center',
    width: 70 + '%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#e3e3e3',
    borderRadius: 18,
    marginTop: 15,
  },
  forgotText: {
    color: 'white',
    marginTop: 10,
  },
  buttonLogin: {
    width: 70 + '%',
    paddingVertical: 14,
    paddingHorizontal: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: 40,
  },
  loginText: {
    alignSelf: 'center',
  },
})
