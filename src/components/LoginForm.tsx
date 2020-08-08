import i18n from '../i18n'
import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-community/masked-view'
import { Content, Input, Item, Text } from 'native-base'
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
      <GradientText style={styles.forgetPasswordTxt}>
        {i18n.t('signIn.forgetPassword')}
      </GradientText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    flexDirection: 'column',
    width: 80 + '%',
  },
  textboxContainer: {
    marginVertical: 10,
    borderColor: Colours.White,
  },
  btnContainer: {
    backgroundColor: 'transparent',
    borderRadius: 15,
    height: 32 + '%',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 100 + '%',
  },
  buttonTxt: {
    color: 'black',
    fontSize: 60,
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
    elevation: 5,
  },
  forgetPasswordTxt: {
    fontSize: 15,
    textAlign: 'center', 
  }
})
