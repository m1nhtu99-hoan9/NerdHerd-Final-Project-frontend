import i18n from '../i18n'

import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Input, Item, Text, View } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as f from 'formik'

import { Colours, Fonts } from '../styles/index'
import { normalise } from '../helpers/Constants'
import { GradientText, TextInput } from './atomic/index'
import { SignInNavContext } from '../contexts'

export default function LoginForm(props: unknown) {
  // get & consume LoginScreen's navigation object
  const nav = useContext(SignInNavContext)

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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    flexDirection: 'column',
    width: 80 + '%',
    alignContent: 'center', 
    justifyContent: 'center',
  },
  btnContainer: {
    backgroundColor: 'white',
    marginVertical: 10 + '%',
    borderRadius: 3,
    height: 33 + '%',
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
    fontSize: normalise(18),
    fontFamily: Fonts.PrimaryBold,
    textAlign: 'center',
  },
  forgetPasswordTxt: {
    fontSize: 15,
    color: Colours.White,
    paddingTop: normalise(10),
    paddingBottom: 15 + '%',
    textAlign: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
})
