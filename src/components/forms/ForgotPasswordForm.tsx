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
 *  - Form validation
 *  - Routing
*/
export default function ForgotPasswordForm() {
  // get & consume LoginScreen's navigation object
  const nav = useContext(SignInNavContext)

  const _forgotPasswordFormOnSubmitted = () => {
    /* implementation for submission handling */
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput i18nPlaceholderContent={'forgotPassword.usernameInput'} />
      </View>
      {/* Forgot Password submit button */}
      <View
        style={{
          flex: 4,
        }}
      >
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={_forgotPasswordFormOnSubmitted}
        >
          <GradientText style={styles.btnTxt}>
            {i18n.t('forgotPassword.submitBtn')}
          </GradientText>
        </TouchableOpacity>
      </View>
      {/* END Sign Up submit button */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 12,
    flexDirection: 'column',
    width: 80 + '%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  btnContainer: {
    backgroundColor: Colours.White,
    marginVertical: 15 + '%',
    borderRadius: 6,
    height: 48,
    justifyContent: 'center',
    width: 100 + '%',
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
