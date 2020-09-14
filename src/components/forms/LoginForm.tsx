import i18n from '../../i18n'

import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Alert,ActivityIndicator, Animated  } from 'react-native'
import { Text, View } from 'native-base'
import { Hideo } from 'react-native-textinput-effects'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

import { useForm, Controller } from 'react-hook-form'
import SyncStorage from 'sync-storage'

import { TouchableOpacity } from 'react-native-gesture-handler'

import { Colours, Fonts } from '../../styles/index'
import { normalise, normaliseH, normaliseV, PATTERN, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../helpers'
import { GradientText, StyledText } from '../atomic/index'

import { SignInNavContext, AppMachineContext } from '../../contexts'
import { asyncLogin } from '../../machines'
import { AntDesign } from '@expo/vector-icons'

interface FormInput {
  password: string
  phoneNum: number
}

export default function LoginForm() {
  // get & consume AppService hooks
  const [appMState, appMSend] = useContext(AppMachineContext)
  // get & consume LoginScreen's navigation object
  const nav = useContext(SignInNavContext)

  const { control, handleSubmit, errors } = useForm<FormInput>()

  const [apiErrorMessage, setApiErrorMessage] = useState<string | undefined>(
    undefined,
  )

  const [isLoading, setLoading] = useState(false)
  const opacity = useState(new Animated.Value(0))[0]
  const [animatedIndex, setAnimatedIndex] = useState(0)

  const animatedContainer = {
    backgroundColor: 'black',
    width: 126 + '%',
    height: 173 + '%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: opacity,
    zIndex: animatedIndex,
    position: 'absolute',
    left: normaliseH(-140),
    top: normaliseV(-720)
  }

  const fireLoading = () => {
    Animated.timing(opacity, {
      toValue: 0.6,
      duration: 500,
      useNativeDriver: false,
    }).start()

  }

  const fireUnloading = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }
    
  useEffect(() => {
    switch (appMState.value) {
      case 'UNAUTHORISED':
        console.log('Not logged in yet')
        break
      case 'AUTHENTICATING':
        setAnimatedIndex(2)
        fireLoading()
        setLoading(true)
        console.log('Resolving login request')
        break
      case 'LOGGED_IN':
        setAnimatedIndex(0)
      setLoading(false)
      fireUnloading()
        /* progress to Home Screen */
        nav.navigate('Home')
        console.log(appMState.context)
        break
      case 'FAILURE':
        console.error('something wrong :(')
        break
    }
  }, [appMState.value])

  const _signInFormOnSubmitted = (data: SignInFormFields) => {
    /* set loading indicator up -> set its state to false when `LOGGED_IN` */
    /* update AppService accordingly */

    appMSend({ type: 'Login', phoneNum: '0967162652', password: 'aacc1234' })
    // console.log(data)
    // console.log('submit btn on click -> sync storage: ', SyncStorage.getAllKeys())
    // console.log('this access token', SyncStorage.get('token'))
    // console.log('on Login screen: ', appMState.value)
  }
  const _forgotPassTxtOnClicked = () => {
    nav.navigate('ForgotPassword')
  }

  const _showPhoneErrorMessage = function (): JSX.Element | undefined {
    /* each call forms (wordplay intended) closure around `errors` object */
    switch (errors.phoneNum?.type) {
      case 'required':
        return (
          <Text style={styles.validationText}>
            {i18n.t('signIn.validation.required')}
          </Text>
        )
      case 'minLength':
        return (
          <Text style={styles.validationText}>
            {i18n.t('signIn.validation.invalid')}
          </Text>
        )
      // input phone number doesn't comply with required Regex pattern
      case 'pattern':
        return (
          <Text style={styles.validationText}>
            {i18n.t('signIn.validation.invalid')}
          </Text>
        )
      /* implicitly, in `default`, return `undefined` */
    }
  }
  

  const _showPasswordErrorMessage = function (): JSX.Element | undefined {
    switch (errors.password?.type) {
      case 'required':
        return (
          <Text style={styles.validationText}>
            {i18n.t('signIn.validation.required')}
          </Text>
        )
      case 'minLength':
        return (
          <Text style={styles.validationText}>
            {i18n.t('signIn.validation.wrongPassword')}
          </Text>
        )
      // input password doesn't comply with required Regex pattern
      case 'pattern':
        return (
          <Text style={styles.validationText}>
            {i18n.t('signIn.validation.wrongPassword')}
          </Text>
        )
    }
  }

  return (
    <View style={styles.container}>

      <Animated.View style={animatedContainer}>
          <ActivityIndicator style={{position: 'absolute'}} size="large" color="white" animating={isLoading} />
      </Animated.View>

      <View style={styles.formContainer}>
        {/* Phone Number input field */}
        <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => {nav.goBack()}}
            >
              <AntDesign
                name="left"
                size={normalise(16)}
                color={Colours.White}
                style={{ alignSelf: 'flex-start' }}
              />
              <StyledText fontWeight="bold">{i18n.t('signUp.backTxt')}</StyledText>
            </TouchableOpacity>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Hideo
              // validation code-block
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              value={value}
              maxLength={10}
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
          rules={{ required: true, minLength: 10, pattern: PATTERN }}
          defaultValue=""
        />
        {_showPhoneErrorMessage()}

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
        {_showPasswordErrorMessage()}

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
    color: 'rgba(242, 38, 19, 1)',
  },
})
