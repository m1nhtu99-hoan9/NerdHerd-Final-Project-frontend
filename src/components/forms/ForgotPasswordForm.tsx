import i18n from '../../i18n'
import { useForm, Controller } from 'react-hook-form'

import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Input, Item, Text, View } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as f from 'formik'

import { Colours, Fonts } from '../../styles/index'
import { normalise, normaliseSizeVertical, PATTERN } from '../../helpers/Constants'
import { GradientText, TextInput } from '../atomic/index'
import { SignInNavContext } from '../../contexts'
import { normaliseH } from '../../helpers'

/**@TODOs
 *  - Form validation
 *  - Routing
 */

interface FormInput {
  phoneNum: number
}

export default function ForgotPasswordForm() {
  // get & consume LoginScreen's navigation object
  const nav = useContext(SignInNavContext)

  const _forgotPasswordFormOnSubmitted = () => {
    /* implementation for submission handling */
  }

  const { control, handleSubmit, errors } = useForm<FormInput>()

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
            // validation code-block
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            value={value}
            maxLength={11}
            // End of validation code-block
              keyboardType="number-pad"
              style={styles.forgotInput}
              i18nPlaceholderContent={'forgotPassword.usernameInput'}
            />
          )}
          name="phoneNum"
          rules={{ required: true, minLength: 10, pattern: PATTERN }}
          defaultValue=""
        />
        {errors.phoneNum?.type === 'required' && (
          <Text style={styles.validationText}>
            {i18n.t('signIn.validation.required')}
          </Text>
        )}
        {errors.phoneNum?.type === 'minLength' && (
          <Text style={styles.validationText}>
            {i18n.t('signIn.validation.invalid')}
          </Text>
        )}
        {errors.phoneNum?.type === 'pattern' && (
          <Text style={styles.validationText}>
            {i18n.t('signIn.validation.invalid')}
          </Text>
        )}
      </View>
      {/* Forgot Password submit button */}
      <View
        style={{
          flex: 4,
        }}
      >
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={handleSubmit(_forgotPasswordFormOnSubmitted)}
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
  forgotInput: {
    paddingLeft: normaliseH(80),
  },
  validationText: {
    fontSize: normalise(14),
    color: 'rgba(242, 38, 19, 1)'
  },
})
