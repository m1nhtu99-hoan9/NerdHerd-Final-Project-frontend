import i18n from '../i18n'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Animated,
  Modal,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { SearchScreenNavigationProps } from '../@types/navigation'
import { any, all } from 'ramda'

import GradientContainer from '../components/atomic/GradientContainer'
import { HomeScreenNavigationProps } from '../@types/navigation'

//Import normalise
import { normalise } from '../../src/helpers/Constants'
import { normaliseH, normaliseV, PATTERN } from '../helpers'

import StyledText from '../../src/components/atomic/StyledText'
import ModalContent from '../components/ModalUserInfoCard'

//Get devices's dimension
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

// import react-hook-form for validation
import { useForm, Controller } from 'react-hook-form'

interface FormInput {
  phoneNum: string
  otp: string
}

export default function SeacrhScreen() {
  const hideSearchAnimation = () => {
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

  const showSearchAnimation = () => {
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

  const navigation = useNavigation<SearchScreenNavigationProps>()
  const heightView = useState(new Animated.Value(normaliseV(700)))[0]
  const marginTop = useState(new Animated.Value(normaliseV(400)))[0]
  const opacity = useState(new Animated.Value(0))[0]

  const animatedContainer = {
    backgroundColor: 'white',
    width: 94 + '%',
    height: heightView,
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
  }

  const [calculateModalVisible, setCalculateModalVisible] = useState(false)
  const [buttonText, setButtonText] = useState('Gửi mã OTP')
  const [isEnabled, setTextInputStatus] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [otpWarn, setOtpWarn] = useState('')
  const [phoneNum, setPhoneNum] = useState(0)

  const isIncorrect = (otpCode: string) => {
    const _isNumDigit = (c: string) =>
      any((x) => x == c && x != ' ')([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    const _isValidOtp = (code: string) => all(_isNumDigit)(code.split(''))

    return otpCode.length < 6 || !_isValidOtp(otpCode)
  }

  const showOtpInput = (data: Object) => {
    if (!isEnabled) {
      console.log(Object.values(data)[0])
      setPhoneNum(Object.values(data)[0])
      showSearchAnimation()
      setTextInputStatus(true)
      setButtonText(i18n.t('search.submitBtn'))
      setCalculateModalVisible(true)
    } else {
      if (isIncorrect(otpCode)) {
        setOtpWarn(i18n.t('search.validation.otpIncorrect'))
      } else {
        navigation.navigate('SearchResult', { phone: undefined })

        //reset the form values after navigate to result screen
        setButtonText('Gửi mã OTP')
        setTextInputStatus(false)
        setOtpWarn('')
        setOtpCode('')
        reset({
          phoneNum: '',
        })

        hideSearchAnimation()
      }
    }
  }

  const _showErrorMessage = function (props: any): JSX.Element | undefined {
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
  // use react-hook-form
  const { control, handleSubmit, errors, reset } = useForm<FormInput>()

  return (
    <GradientContainer flexDirection={'column'}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={calculateModalVisible}
      >
        <ModalContent
          icon="check"
          headerText={'Thành công'}
          contentText={`Đã gửi tin nhắn chứa mã OTP tới số điện thoại ${phoneNum}.`}
          color="#36ad51"
        ></ModalContent>
        <TouchableOpacity
          style={styles.calculateModalConfirmButton}
          onPress={() => setCalculateModalVisible(false)}
        >
          <Text style={styles.formConfirmText}>OK</Text>
        </TouchableOpacity>
      </Modal>

      <View style={styles.container}>
        <Animated.View style={animatedContainer}>
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
                  onChange(value)
                  console.log(phoneNum)
                  console.log(value)
                  if (isEnabled && phoneNum != Number(value)) {
                    hideSearchAnimation()
                    setOtpCode('')
                    setTextInputStatus(false)
                    setButtonText('Gửi lại mã OTP')
                  } else {
                    setButtonText('Gửi mã OTP')
                  }
                }}
                onBlur={onBlur}
                value={value}
                maxLength={10}
                // End of validation code-block
                style={styles.inputPhone}
                placeholder={i18n.t('search.phoneNumInput')}
              />
            )}
            name="phoneNum"
            rules={{ required: true, minLength: 10, pattern: PATTERN }}
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
              // End of validation code-block
              editable={isEnabled}
              value={otpCode}
              style={{
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
              }}
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
              onPress={handleSubmit(showOtpInput)}
            >
              <StyledText fontWeight="bold" style={styles.searchText}>
                {buttonText}
              </StyledText>
            </TouchableOpacity>
          </Animated.View>
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
    marginTop: normaliseV (1140),
    marginLeft: normaliseH(204)

  },
  formConfirmText: {
    color: 'white',
    fontSize: normalise(16),
    fontWeight: '600',
  },
})
