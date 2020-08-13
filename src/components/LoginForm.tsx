import i18n from '../i18n'

import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Input, Item, Text, View } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as f from 'formik'

import Colours from '../styles/colours'
import { GradientText, TextInput } from './atomic/index'
import { SignInNavContext } from '../contexts'

export default function LoginForm(props: unknown) {
  const [isSignUpTextPressed, setSignUpTextPressed] = useState(false)

  // get & consume LoginScreen's navigation object
  const nav = useContext(SignInNavContext)

  /* events triggered when `Sign Up` text link is clicked are defined here */
  const _signUpTxtOnPressed = () => {
    setSignUpTextPressed(true)
    nav.navigate('SignUp')
  }

  return (
    <View style={styles.container}>
      <TextInput i18nPlaceholderContent={'signIn.usernameInput'} />
      <TextInput
        i18nPlaceholderContent={'signIn.passwordInput'}
        secureTextEntry
      />
      <TouchableOpacity>
        <Text style={styles.forgetPasswordTxt}>
          {i18n.t('signIn.forgetPassword')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnContainer}>
        <GradientText style={styles.btnTxt}>
          {i18n.t('signIn.submitBtn')}
        </GradientText>
      </TouchableOpacity>
      <View style={styles.signUpTxtContainer}>
        <View>
          <Text style={[styles.forgetPasswordTxt, { textAlign: 'right' }]}>
            {`${i18n.t('signIn.askSignUpTxt')}`}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.signUpTouchableTxt}
          activeOpacity={0.6}
          onPress={_signUpTxtOnPressed}
        >
          <Text style={styles.signUpTxt}>{i18n.t('signIn.signUpTxt')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    flexDirection: 'column',
    width: 80 + '%',
  },
  btnContainer: {
    backgroundColor: 'white',
    marginVertical: 10 + '%',
    borderRadius: 3,
    height: 33 + '%',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 98 + '%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  btnTxt: {
    fontSize: 18,
    textAlign: 'center',
  },
  forgetPasswordTxt: {
    flex: 1,
    fontSize: 15,
    color: Colours.White,
    paddingTop: 10,
    textAlign: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  signUpTxtContainer: {
    flex: 1,
    flexDirection: 'row',
    width: 100 + '%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  signUpTxt: {
    flex: 2,
    fontSize: 15,
    color: Colours.Sapphire,
    paddingLeft: 5,
    paddingTop: 10,
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
  signUpTouchableTxt: {
    shadowOffset: {
      width: 1.25,
      height: 1.25,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.12,
    elevation: 3,
  },
})
