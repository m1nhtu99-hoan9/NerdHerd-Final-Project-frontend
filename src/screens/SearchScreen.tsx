import i18n from '../i18n'
import React, { useState, useContext, useEffect } from 'react'
import { any, all } from 'ramda'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Animated,
  ActivityIndicator,
  Modal,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BlurView } from 'expo-blur'

import { useForm, Controller } from 'react-hook-form'
import { AppMachineContext } from '../contexts'
import { useNavigation } from '@react-navigation/native'
import { SearchScreenNavigationProps } from '../@types/navigation'

import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  normalise,
  normaliseH,
  normaliseV,
  PATTERN,
} from '../helpers'

import { StyledText, GradientContainer } from '../../src/components/atomic'
import ModalContent from '../components/ModalUserInfoCard'
import { Icon } from 'native-base'

interface FormInput {
  phoneNum: string
  otp: string
}

const _isOtpInvalid = (otpCode: string) => {
  // const _isNumDigit = (c: string) =>
  //   any((x) => x == c && x != ' ')([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  // const _isValidOtp = (code: string) => all(_isNumDigit)(code.split(''))

  return otpCode.length < 6
}

enum PopupColor {
  GREEN = '#36AD51',
  RED = '#931A25',
}

enum PopupIcon {
  SUCCESS = 'check',
  ERROR = '!',
}

export default function SeacrhScreen() {
  const [appMState, appMSend] = useContext(AppMachineContext)
  const navigation = useNavigation<SearchScreenNavigationProps>()
  const { control, handleSubmit, errors, reset } = useForm<FormInput>()

  const heightView = useState(new Animated.Value(normaliseV(700)))[0]
  const marginTop = useState(new Animated.Value(normaliseV(400)))[0]
  const opacity = useState(new Animated.Value(0))[0]
  const [isPopupModalVisible, setPopupModalVisible] = useState(false)
  const [buttonText, setButtonText] = useState('Gửi mã OTP')
  const [otpCode, setOtpCode] = useState('')
  const [otpWarn, setOtpWarn] = useState('')
  const [phoneNum, setPhoneNum] = useState(0)

  /* states for doing loading animation */
  const opacityAnimatedContainer = useState(new Animated.Value(0))[0]
  const noticeOpacity = useState(new Animated.Value(0))[0]
  const [isLoading, setLoading] = useState(false)
  const [animatedIndex, setAnimatedIndex] = useState(-2)

  const _fireLoading = () => {
    Animated.timing(opacityAnimatedContainer, {
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
    Animated.timing(opacityAnimatedContainer, {
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
    _fireUnloading()
  }

  const _startAnimation = () => {
    setAnimatedIndex(2)
    _fireLoading()
    setLoading(true)
  }

  /* states for content of popup modal */
  const [iconColour, setIconColour] = useState<
    PopupColor.GREEN | PopupColor.RED
  >(PopupColor.GREEN)
  const [icon, setIcon] = useState<PopupIcon.ERROR | PopupIcon.SUCCESS>(
    PopupIcon.SUCCESS,
  )
  const [message, setMessage] = useState('')
  const [header, setHeader] = useState('')

  // state for visibility of OTP input field
  const [isOtpFieldEnabled, setOtpFieldEnabled] = useState(false)

  const _hideSearchAnimation = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start()
    Animated.timing(heightView, {
      toValue: normaliseV(700),
      duration: 700,
      delay: 400,
      useNativeDriver: false,
    }).start()
    Animated.timing(marginTop, {
      toValue: normaliseV(400),
      duration: 700,
      delay: 400,
      useNativeDriver: false,
    }).start()
  }

  const _showSearchAnimation = () => {
    Animated.timing(heightView, {
      toValue: normaliseV(950),
      duration: 700,
      useNativeDriver: false,
    }).start()
    Animated.timing(marginTop, {
      toValue: normaliseV(650),
      duration: 700,
      useNativeDriver: false,
    }).start()
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: 300,
      useNativeDriver: false,
    }).start()
  }

  const _setPopupContent = function (
    isSuccess: boolean,
    header: string,
    content: string,
  ) {
    setIconColour(isSuccess ? PopupColor.GREEN : PopupColor.RED)
    setIcon(isSuccess ? PopupIcon.SUCCESS : PopupIcon.ERROR)
    setMessage(content)
    setHeader(header)
  }
  const _showErrorMessage = function (props: unknown): JSX.Element | undefined {
    switch (props) {
      case 'required':
        return (
          <View style={styles.validationTextContainer}>
            <Text style={styles.validationText}>
              {i18n.t('signIn.validation.required')}
            </Text>
          </View>
        )
      case 'minLength':
        return (
          <View style={styles.validationTextContainer}>
            <Text style={styles.validationText}>
              {i18n.t('signIn.validation.invalid')}
            </Text>
          </View>
        )
      case 'pattern':
        return (
          <View style={styles.validationTextContainer}>
            <Text style={styles.validationText}>
              {i18n.t('signIn.validation.invalid')}
            </Text>
          </View>
        )
    }
  }

  /** Definition for on-touched behaviour of submit button
   *  @param data Form data consumed by `react-hook-form`
   *  @author Trung Duc Do
   */

  /* On touched behaviours */

  const _onSpinnerTouched = () => {
    _stopAnimation()
  }

  const onSubmitButtonClicked = (data: Object) => {
    console.log(`SearchScreen; current machine state: ${appMState.value}`)

    /* If the OTP field is hidden */
    if (!isOtpFieldEnabled) {
      // console.log(`Input phone number: ${Object.values(data)[0]}`)

      /* send OTP request with the help of `AppService` */
      setPhoneNum(Object.values(data)[0])
      appMSend({ type: 'RequestOtp', phoneNum: Object.values(data)[0] })

      /* popup modal will be displayed accordingly to the response 
         as defined in `useEffect` hook below */

      /* show OTP input field */
      _showSearchAnimation()
      setOtpFieldEnabled(true)
      setButtonText(i18n.t('search.submitBtn'))
    } else {
      // console.log('Form payload', data)
      console.log('Input OTP from user', otpCode)
      /* If the OTP input field is already visible, check if the OTP code is valid */
      if (_isOtpInvalid(otpCode)) {
        // in order for error message to be displayed
        setOtpWarn(i18n.t('search.validation.otpIncorrect'))
      } else {
        // send OTP request with the help of `AppService`
        appMSend({
          type: 'QueryScore',
          inputOtp: otpCode,
          phoneNum: Object.values(data)[0],
        })

        _startAnimation()

        // reset the form values to its initial state
        setButtonText('Gửi mã OTP')
        setOtpFieldEnabled(false)
        setOtpWarn('')
        setOtpCode('')
        reset({
          phoneNum: '',
        })

        _hideSearchAnimation()
      }
    }
  }

  /* END: On touched behaviours */

  useEffect(() => {
    ;(function (state) {
      console.log(`SearchScreen; current machine state: ${appMState.value}`)
      switch (state) {
        /* Expected intial machine state for SearchScreen: `READY` 
           If `AppService` is still in `PROFILE_FETCHING` state,
             no request will be processed 
        */
        case 'OTP_UPDATED':
          /* prepare content of Popup modal */
          _setPopupContent(
            true,
            'Thành công',
            `Đã gửi tin nhắn chứa mã OTP tới số điện thoại ${phoneNum}.`,
          )

          /* display the popup modal to inform user that the request is successfully resolved */
          setPopupModalVisible(true)

          /* for DEBUGGING?! nah ┌П┐(►˛◄’!) I just want to see OTP code
             yeah, I know what you're thinking ( ͡ ͡° ͜つ ͡͡° ) Yes, I'm cheating ◕‿↼
          */
          console.log(`｀(^▼^)´ OTP: ${appMState.context.otp}`)
          return
        case 'FAILURE':
          /* prepare content of Popup modal */
          _setPopupContent(false, 'Lỗi', `Internal server error!`)

          /* display the popup modal to inform user that the request is successfully resolved */
          setPopupModalVisible(true)

          console.log('FAILURE happend during OTP request')
          return
        case 'CRESCORE_READY':
          // console.log(appMState.context)

          _stopAnimation()

          navigation.navigate('SearchResult', {
            // @ts-ignore
            phone: phoneNum,
            score: parseFloat(appMState.context.searchHistory[0].score),
          })

          appMSend('MoveOn')
          return
      }
    })(appMState.value)
  }, [appMState, phoneNum, icon, iconColour, message, header, isLoading])

  return (
    <GradientContainer flexDirection={'column'}>
      {/* Popup alert box */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isPopupModalVisible}
      >
        <ModalContent
          icon={icon}
          headerText={header}
          contentText={message}
          color={iconColour}
        ></ModalContent>
        <TouchableOpacity
          style={styles.calculateModalConfirmButton}
          onPress={() => setPopupModalVisible(false)}
        >
          <Text style={styles.formConfirmText}>OK</Text>
        </TouchableOpacity>
      </Modal>
      {/* END: Popup alert box */}
      <View style={styles.container}>
        <Animated.View
          style={[styles.animatedContainer, { height: heightView }]}
        >
          <StyledText fontWeight="bold" style={styles.headerText}>
            {i18n.t('search._nav')}
          </StyledText>

          {/* Phone Number input field */}
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                // validation code-block
                onChangeText={(value) => {
                  // update lately input data
                  onChange(value)

                  // for DEBUGGING
                  // console.log(phoneNum)
                  // console.log(value)

                  if (isOtpFieldEnabled && phoneNum != Number(value)) {
                    /* modify submit button and OTP confirmation text field accordingly */
                    /* If the phoneNum is changed, reset the OTP field to hidden and change button text */
                    _hideSearchAnimation()
                    setOtpCode('')
                    setOtpFieldEnabled(false)
                    setButtonText('Gửi lại mã OTP')
                  } else {
                    /* If the phoneNum is not changed, change the button text */
                    setButtonText('Gửi mã OTP')
                  }
                }}
                onBlur={onBlur}
                value={value}
                maxLength={10}
                // END: validation code-block
                style={styles.inputPhone}
                placeholder={i18n.t('search.phoneNumInput')}
              />
            )}
            name="phoneNum"
            rules={{
              required: true,
              minLength: 10,
              pattern: /(09)+([0-9]{8})/,
            }}
            defaultValue=""
          />

          <View style={styles.validationTextContainer}>
            {_showErrorMessage(errors.phoneNum?.type)}
          </View>

          {/* END Phone Number input field */}

          <Animated.View style={{ opacity: opacity }}>
            <TextInput
              // validation code-block
              onChangeText={(value) => setOtpCode(value)}
              maxLength={6}
              // END: validation code-block
              editable={isOtpFieldEnabled}
              value={otpCode}
              style={styles.otpTextInput}
              placeholder={i18n.t('search.otpCodeInput')}
            />
            <View style={styles.validationTextContainer}>
              <Text style={styles.validationText}>{otpWarn}</Text>
            </View>
          </Animated.View>

          <Animated.View
            style={{
              marginTop: marginTop,
              width: 40 + '%',
              position: 'absolute',
              alignSelf: 'center',
            }}
          >
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSubmit(onSubmitButtonClicked)}
            >
              <StyledText fontWeight="bold" style={styles.searchText}>
                {buttonText}
              </StyledText>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        {/** Loading indicator */}
        <Animated.View
          style={[
            styles.animatedModalContainer,
            { opacity: opacityAnimatedContainer, zIndex: animatedIndex },
          ]}
        />
        <Animated.View
          onTouchStart={_onSpinnerTouched}
          style={[
            styles.animatedNoticeContainer,
            { opacity: noticeOpacity, zIndex: animatedIndex },
          ]}
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
            Đang tải...
          </StyledText>
        </Animated.View>
      </View>
    </GradientContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + '%',
    paddingTop: normaliseV(140),
  },
  content: {},

  headerText: {
    fontSize: normalise(29),
    paddingTop: normaliseV(56),
    color: 'black',
  },
  inputPhone: {
    fontFamily: 'ComfortaaRegular', // Test
    lineHeight: 17,
    textAlign: 'center',
    height: normalise(50),
    marginVertical: normalise(15),
    width: 100 + '%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingHorizontal: normaliseV(20),
    alignSelf: 'center',
    marginTop: normaliseV(70),
  },
  inputOtp: {},
  searchButton: {
    marginTop: normaliseV(100),
    borderWidth: 2,
    width: 100 + '%',
    height: normaliseV(140),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 7,
  },
  searchText: {
    fontSize: normalise(13.6),
    color: 'black',
  },
  validationText: {
    fontSize: normalise(14),
    marginTop: normaliseV(-40),
    marginLeft: normaliseH(70),
    color: 'rgba(242, 38, 19, 1)',
  },
  validationTextContainer: {
    alignItems: 'center',
  },
  // Modal style
  calculateModalConfirmButton: {
    width: 70 + '%',
    height: 10 + '%',
    backgroundColor: '#36ad51',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normaliseV(1140),
    marginLeft: normaliseH(204),
  },
  formConfirmText: {
    color: 'white',
    fontSize: normalise(16),
    fontWeight: '600',
  },
  animatedContainer: {
    backgroundColor: 'white',
    width: 94 + '%',
    alignSelf: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.44,
    shadowRadius: 6.27,
    elevation: 10,
    paddingHorizontal: normaliseH(40),
  },
  animatedModalContainer: {
    backgroundColor: 'black',
    width: 94 + '%',
    height: 51.1 + '%',
    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    left: normaliseH(42),
    top: normaliseV(140),
    borderRadius: 15,
  },
  animatedNoticeContainer: {
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    top: normaliseV(800),
    width: normaliseH(550),
    height: normaliseV(350),
    backgroundColor: 'black',
    position: 'absolute',
  },
  otpTextInput: {
    fontFamily: 'ComfortaaRegular', // Test
    lineHeight: 17,
    textAlign: 'center',
    height: normalise(50),
    marginVertical: normalise(15),
    width: 100 + '%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingHorizontal: normaliseV(20),
    alignSelf: 'center',
  },
})
