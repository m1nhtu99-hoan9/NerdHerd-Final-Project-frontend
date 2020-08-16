import i18n from '../../i18n'

import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Input, Item, Text, View } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as f from 'formik'

import { Colours, Fonts } from '../../styles/index'
import { normalise, normaliseSizeVertical } from '../../helpers/Constants'
import { GradientText, TextInput } from '../atomic/index'
import { SignInNavContext } from '../../contexts'

/**@TODOs 
 *  - `Back` button
 *  - Form validation
 *  - Routing
*/
export default function SignupForm(props: unknown) {
  // get & consume LoginScreen's navigation object
  const nav = useContext(SignInNavContext)

  const _signInFormOnSubmitted = () => {
    nav.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput i18nPlaceholderContent={'signUp.licenseCodeInput'} />
        <TextInput i18nPlaceholderContent={'signUp.emailInput'} />
        <TextInput i18nPlaceholderContent={'signUp.phoneInput'} />
        <TextInput
          i18nPlaceholderContent={'signUp.passwordInput'}
          secureTextEntry
        />
        <TextInput
          i18nPlaceholderContent={'signUp.rePasswordInput'}
          secureTextEntry
        />
      </View>
      <View
        style={{
          flex: 4,
        }}
      >
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={_signInFormOnSubmitted}
        >
          <GradientText style={styles.btnTxt}>
            {i18n.t('signUp.submitBtn')}
          </GradientText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
    flexDirection: 'column',
    width: 80 + '%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    backgroundColor: '#070B2B', // Anh Phat's colour :(
    marginVertical: 15 + '%',
    borderRadius: 6,
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
})
