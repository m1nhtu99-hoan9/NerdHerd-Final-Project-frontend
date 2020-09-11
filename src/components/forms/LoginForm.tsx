import i18n from '../../i18n'
import { useForm, Controller } from 'react-hook-form'

import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Alert } from 'react-native'
import { Input, Item, Text, View, Form } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as f from 'formik'

import { Colours, Fonts } from '../../styles/index'
import { normalise, normaliseSizeVertical } from '../../helpers/Constants'
import { GradientText, TextInput, StyledText } from '../atomic/index'
import { SignInNavContext } from '../../contexts'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Hideo } from 'react-native-textinput-effects'
import { normaliseV } from '../../helpers'

interface FormInput {
  password: string
  phoneNum: number
}

export default function LoginForm() {
  // get & consume LoginScreen's navigation object
  const nav = useContext(SignInNavContext)

  const _signInFormOnSubmitted = (data: Object) => {
    /* login authentication pushed here */
    nav.navigate('Home')
    console.log(data)
  }
  const _forgotPassTxtOnClicked = () => {
    nav.navigate('ForgotPassword')
  }

  const { control, handleSubmit, errors } = useForm<FormInput>()

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {/* <TextInput
                  onChangeText={(text) => {
            setValue('phoneNum', text)
          }}
          i18nPlaceholderContent={'signIn.usernameInput'}
          keyboardType="number-pad"
          style={styles.input}
          clearButtonMode="always"
        /> */}

        {/* <TextInput
          i18nPlaceholderContent={'signIn.usernameInput'}
          secureTextEntry
          style={styles.input}
          clearButtonMode="always"
        /> */}

        {/* Phone Number input field */}

        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Hideo
              // validation code-block
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              value={value}
              maxLength={11}
              // End of validation code-block
              style={styles.input}
              placeholder={i18n.t('signIn.usernameInput')}
              iconClass={FontAwesomeIcon}
              iconName={'mobile-phone'}
              iconColor={'grey'}
              iconSize={30}
              keyboardType={'number-pad'}
              // this is used as backgroundColor of icon container view.
              iconBackgroundColor={'white'}
              inputStyle={{ color: '#464949' }}
            />
          )}
          name="phoneNum"
          rules={{ required: true, minLength: 10, pattern: /^0[0-9]+$/ }}
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

        {/* END Phone Number input field */}
        {/* Password input field */}
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Hideo
              // validation code-block
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              value={value}
              maxLength={14}
              // End of validation code-block
              secureTextEntry
              placeholder={i18n.t('signIn.passwordInput')}
              iconClass={FontAwesomeIcon}
              iconName={'lock'}
              iconColor={'grey'}
              iconSize={22}
              // this is used as backgroundColor of icon container view.
              iconBackgroundColor={'white'}
              inputStyle={{ color: '#464949' }}
            />
          )}
          name="password"
          rules={{ required: true, minLength: 6, pattern: /^[a-zA-Z0-9]+$/ }}
          defaultValue=""
        />
        {errors.password?.type === 'required' && (
          <Text style={styles.validationText}>
            {i18n.t('signIn.validation.required')}
          </Text>
        )}
        {errors.password?.type === 'minLength' && (
          <Text style={styles.validationText}>
            {i18n.t('signIn.validation.wrongPassword')}
          </Text>
        )}
        {errors.password?.type === 'pattern' && (
          <Text style={styles.validationText}>
            {i18n.t('signIn.validation.wrongPassword')}
          </Text>
        )}

        {/* END Password input field */}
      </View>
      <View style={{ flex: 2, justifyContent: 'center' }}>
        {/* Link to `ForgotPassword` screen */}
        <TouchableOpacity onPress={_forgotPassTxtOnClicked}>
          <StyledText fontWeight="bold" style={styles.forgetPasswordTxt}>
            {i18n.t('signIn.forgetPassword')}
          </StyledText>
        </TouchableOpacity>
        {/* END Link to `ForgotPassword` screen */}
      </View>
      {/* Sign In submit button */}
      <View
        style={{
          // !! DANGEROUR ZONE FOR EDITTING !!
          flex: 9,
        }}
      >
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={handleSubmit(_signInFormOnSubmitted)}
        >
          <GradientText style={styles.btnTxt}>
            {i18n.t('signIn.submitBtn')}
          </GradientText>
        </TouchableOpacity>
      </View>
      {/* END Sign In submit button */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 11, // !! DANGEROUR ZONE FOR EDITTING !!
    flexDirection: 'column',
    width: 80 + '%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 15, // !! DANGEROUR ZONE FOR EDITTING !!
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    backgroundColor: Colours.White,
    marginVertical: 15 + '%',
    borderRadius: 6,
    height: 45,
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
    textAlign: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  input: {
    marginTop: 30,
    marginBottom: -50,
  },
  validationText: {
    fontSize: normalise(14),
    color: 'rgba(242, 38, 19, 1)'
  },
})
