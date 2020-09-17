import i18n from '../../i18n'

import React, { useState, useEffect, useContext } from 'react'
import {
  StyleSheet,
  Alert,
  ActivityIndicator,
  Animated,
  Modal,
} from 'react-native'
import { Text, View } from 'native-base'
import { Hideo } from 'react-native-textinput-effects'
import { AntDesign, FontAwesome } from '@expo/vector-icons'

import { useForm, Controller } from 'react-hook-form'
import { BlurView } from 'expo-blur'

import { TouchableOpacity } from 'react-native-gesture-handler'

import { Colours, Fonts } from '../../styles/index'
import {
  normalise,
  normaliseH,
  normaliseV,
  PATTERN,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../helpers'
import { GradientText, StyledText } from '../atomic/index'

import { SignInNavContext, AppMachineContext } from '../../contexts'

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

  /* states for doing loading animation */
  const opacity = useState(new Animated.Value(0))[0]
  const noticeOpacity = useState(new Animated.Value(0))[0]
  const [isLoading, setLoading] = useState(false)
  const [animatedIndex, setAnimatedIndex] = useState(-2)
  const [blurOpacity, setBlurOpacity] = useState(0)
  const [isFirstRender, setIsFirstRender] = useState(true)

  const _fireLoading = () => {
    Animated.timing(opacity, {
      toValue: 0.6,
      duration: 500,
      useNativeDriver: false,
    }).start()
    Animated.timing(noticeOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false,
    }).start()
  }

  const _fireUnloading = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start()
    Animated.timing(noticeOpacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start()
  }

  const _stopAnimation = () => {
    setAnimatedIndex(-2)
    setLoading(false)
    setBlurOpacity(0)
    _fireUnloading()
  }

  const _startAnimation = () => {
    setAnimatedIndex(2)
    _fireLoading()
    setBlurOpacity(1)
    setLoading(true)
  }
  const _onSpinnerTouched = () => {
    _stopAnimation()
  }
  const _forgotPassTxtOnClicked = () => {
    nav.navigate('ForgotPassword')
  }

  const _signInTxtOnPressed = () => {
    nav.navigate('SignUp')
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

  /** "serve" API error message if it's available ლ(´ڡ`ლ)
   *  ; otherwise, "serve" password validation error message
   */
  const _showPasswordErrorMessage = function (): JSX.Element | undefined {
    // @ts-ignore; we need JS' flexibility here ¯\_(ツ)_/¯
    if (apiErrorMessage != ' ' && apiErrorMessage?.length) {
      return <Text style={styles.validationText}>{apiErrorMessage}</Text>
    }

    // ლ(´ڡ`ლ)
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

  const _signInFormOnSubmitted = (data: SignInFormFields) => {
    /* PM's phone number (for DEBUGGING, ya know? ¯\_(ツ)_/¯): "0967162652" */
    /* in development mode */
    // appMSend('Login', {phoneNum: "0967162652", password: "aacc1234"})

    appMSend({
      type: 'Login',
      phoneNum: data.phoneNum,
      password: data.password,
    })
  }

  useEffect(() => {
    if (appMState.value == 'UNAUTHORISED') {
      /* initial state of the app */
      // console.log('Not logged in yet')
    }
    if (appMState.value == 'AUTHENTICATING') {
      // start loading indicator
      _startAnimation()
      setIsFirstRender(false)
      console.log('Resolving login request')
    }
    if (appMState.value == 'LOGGED_IN') {
      // stop loading indicator
      _stopAnimation()

      // console.log(`Login request resolved: status ${appMState.context.lastResponse.statusCode}`)
      console.log(`Token: ${appMState.context.token}`)

      if (appMState.context.token) {
        /* double-check to make sure access token has been generated and stored
           just to be sure, ya know 凸( •̀_•́ )凸
        */
        nav.navigate('Home')
      } else {
        /* to be fair, if this happens, (ó﹏ò｡)
           there is something wrong with `AppService`
        */
        setApiErrorMessage(
          'Your login credentials are incorrect! Please re-check!',
        )
      }
    }
    if (appMState.value == 'FAILURE') {
      /* turn off loading indicator */
      _stopAnimation()

      // update api error message state so that the message can be showed
      if(!isFirstRender)
      {
        setApiErrorMessage(appMState.context.lastResponse.lastErrorMessage)
      }
      setIsFirstRender(true)

      console.log('FAILED')
      console.log(appMState.context.lastResponse)
    }
  }, [appMState])

  const animatedContainerStyleSheet = {
    backgroundColor: 'black',
    width: 126 + '%',
    height: 173 + '%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: opacity,
    zIndex: animatedIndex,
    position: 'absolute',
    left: normaliseH(-140),
    top: normaliseV(-720),
  }

  const animatedNoticeContainer = {
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    top: normaliseV(80),
    opacity: noticeOpacity,
    zIndex: animatedIndex,
    width: normaliseH(550),
    height: normaliseV(350),
    backgroundColor: 'black',
    position: 'absolute',
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {/* Phone Number input field */}
        <TouchableOpacity
          style={{ flexDirection: 'row', marginBottom: normaliseV(0) }}
          onPress={() => {
            nav.goBack()
          }}
        >
          <AntDesign
            name="left"
            size={normalise(16)}
            color={Colours.White}
            style={{ alignSelf: 'center' }}
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
              iconClass={FontAwesome}
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
              iconClass={FontAwesome}
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
        {/* show error messages related to password validation and API responses */}
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
          justifyContent: 'center',
          alignItems: 'center',
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
      <View style={styles.signUpTxtContainer}>
        {/* `Have no account yet?` text */}
        <View>
          <Text style={[styles.forgetPasswordTxt, { textAlign: 'right' }]}>
            {`${i18n.t('signIn.askSignUpTxt')}`}
          </Text>
        </View>
        {/* END `Have no account yet?` text */}
        {/* Link to `SignUp` screen */}

        <TouchableOpacity
          style={styles.signInTouchableTxt}
          activeOpacity={0.6}
          onPress={_signInTxtOnPressed}
        >
          <Text style={styles.signUpTxt}>{i18n.t('signIn.signUpTxt')}</Text>
        </TouchableOpacity>

        {/* END Link to `SignUp` screen */}
      </View>

      <Animated.View style={animatedContainerStyleSheet}></Animated.View>
      <BlurView
        intensity={60}
        tint={'dark'}
        style={[
          StyleSheet.absoluteFill,
          {
            zIndex: animatedIndex,
            opacity: blurOpacity,
            position: 'absolute',
            width: 126 + '%',
            height: 173 + '%',
            left: normaliseH(-140),
            top: normaliseV(-720),
          },
        ]}
      ></BlurView>
      <Animated.View
        onTouchStart={_onSpinnerTouched}
        style={animatedNoticeContainer}
      >
        <ActivityIndicator
          style={{ position: 'absolute', top: normaliseV(100) }}
          size="large"
          color="lightgrey"
          animating={isLoading}
        />
        <StyledText
          fontWeight="bold"
          style={{ marginTop: normaliseV(260), fontSize: normalise(14) }}
        >
          Đang xác thực...
        </StyledText>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.7, // !! DANGEROUR ZONE FOR EDITTING !!
    flexDirection: 'column',
    width: 80 + '%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 15, // !! DANGEROUR ZONE FOR EDITTING !!
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  btnContainer: {
    backgroundColor: Colours.White,
    borderRadius: 6,
    height: 45,
    justifyContent: 'center',
    width: normaliseH(1100),
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
  },
  validationText: {
    fontSize: normalise(14),
    color: 'rgba(242, 38, 19, 1)',
    paddingBottom: normaliseV(27),
    alignSelf: 'center',
  },
  signUpTxt: {
    flex: 2,
    fontSize: 15,
    fontFamily: Fonts.PrimaryBold,
    color: Colours.Sapphire,
    paddingLeft: 5,
    paddingTop: 10,
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
  signInTouchableTxt: {
    width: normaliseH(300),
    height: normaliseV(100),
    shadowOffset: {
      width: 1.25,
      height: 1.25,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.12,
    elevation: 3,
    alignSelf: 'flex-end',
  },
  signUpTxtContainer: {
    marginBottom: normaliseV(-35),
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
})
