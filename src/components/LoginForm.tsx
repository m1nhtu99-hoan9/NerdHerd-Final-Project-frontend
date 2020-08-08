import i18n from '../i18n'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Input, Item, Text, View } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as f from 'formik'

import Colours from '../styles/colours'
import GradientText from './atomic/GradientText'

export default function LoginForm(props: unknown) {
  return (
    <View style={styles.container}>
      <Item rounded style={styles.textboxContainer}>
        <Input
          selectionColor={Colours.White}
          style={styles.placeholderTxt}
          placeholder={i18n.t('signIn.usernameInput')}
          placeholderTextColor={Colours.White}
        />
      </Item>
      <Item rounded style={styles.textboxContainer}>
        <Input
          selectionColor={Colours.White}
          style={styles.placeholderTxt}
          placeholder={i18n.t('signIn.passwordInput')}
          placeholderTextColor={Colours.White}
          secureTextEntry
        />
      </Item>
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
        <TouchableOpacity style={styles.signUpTouchableTxt}>
          <Text style={styles.signUpTxt}>
            {i18n.t('signIn.signUpTxt')}
          </Text>
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
  textboxContainer: {
    flex: 3,
    marginVertical: 10,
    borderColor: Colours.White,
    shadowOffset: {
      width: 0,
      height: 0.25,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1,
    elevation: 2,
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
  placeholderTxt: {
    backgroundColor: 'transparent',
    borderRadius: 99,
    borderWidth: 2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderColor: Colours.White,
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
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.12,
    elevation: 3,
  }
})
