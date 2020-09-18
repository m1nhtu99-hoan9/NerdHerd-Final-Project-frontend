import i18n from '../i18n'
import React, { useContext, useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  Systrace,
  TextInput,
  Animated,
  ActivityIndicator,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { GradientContainer, StyledText } from '../components/atomic'
import { ProfileScreenNavigationProp } from '../@types/navigation'

import {
  normalise,
  normaliseH,
  normaliseV,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../helpers'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'

import { AppMachineContext } from '../contexts'
import { BlurView } from 'expo-blur'

interface FormInput {
  oldPassword: string
  newPassword: string
  repeatNewPassword: string
}

export default function InformationScreen() {
  // consume AppService hooks
  const [appMState, appMSend] = useContext(AppMachineContext)

  const navigation = useNavigation<ProfileScreenNavigationProp>()
  const { control, handleSubmit, errors, trigger, reset } = useForm<FormInput>()

  // state for visibilty of Change Password form
  const [modalVisible, setModalVisible] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const [userInfo, setUserInfo] = useState<
    Omit<ProfileOkResponse, 'search_history'>
  >({
    full_name: 'Ngo Tai Phat',
    bank_id: 'Techcombank',
    email: 'phatxxxxx@gmail.com',
    phone: '094345xxx',
    user_id: '',
  })

  /* states for loading animation */
  const [isLoading, setLoading] = useState(false)
  const [blurOpacity, setBlurOpacity] = useState(0)
  const [blurIndex, setBlurIndex] = useState(-2)
  const noticeOpacity = useState(new Animated.Value(0))[0]
  const [animatedIndex, setAnimatedIndex] = useState(-2)

  const _stopAnimation = () => {
    setAnimatedIndex(-2)
    setLoading(false)
    setBlurIndex(-6)
    setBlurOpacity(0)
    _fireUnloading
  }
  const _startAnimation = () => {
    setAnimatedIndex(8)
    _fireLoading()
    setBlurIndex(8)
    setBlurOpacity(1)
    setLoading(true)
  }

  const _fireLoading = () => {
    Animated.timing(noticeOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false,
    }).start()
  }

  const _fireUnloading = () => {
    Animated.timing(noticeOpacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start()
  }

  const _logoutButtonOnClicked = () => {
    // update AppService state accordingly
    appMSend('Logout')

    // navigate back to LoginScreen
    navigation.replace('Login', { name: 0 })
  }

  const _showErrorMessage = function (
    props: any,
    type: string,
  ): JSX.Element | undefined {
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
        if (type != 'repeatPassword') {
          return (
            <View style={styles.validationTextContainer}>
              <Text style={styles.validationText}>
                {i18n.t('signIn.validation.invalid')}
              </Text>
            </View>
          )
        } else {
          return (
            <View style={styles.validationTextContainer}>
              <Text style={styles.validationText}>
                Mật khẩu nhập lại không chính xác
              </Text>
            </View>
          )
        }

      case 'pattern':
        return (
          <View style={styles.validationTextContainer}>
            <Text style={styles.validationText}>
              {i18n.t('signIn.validation.invalid')}
            </Text>
          </View>
        )
    }
    if (type != 'oldPassword') {
      if (repeatPassword != newPassword) {
        if (type == 'repeatPassword')
          return (
            <View style={styles.validationTextContainer}>
              <Text style={styles.validationText}>
                Mật khẩu nhập lại không chính xác
              </Text>
            </View>
          )
      }
    }
  }

  const _confirmButtonOnSubmit = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    ;(function (state) {
      switch (state) {
        case 'UNAUTHORISED':
          /** @desc rarely happens */

          // @ts-ignore
          navigation.navigate('Index')
          return
        case 'LOGGED_IN':
          appMSend('MoveOn')
          return
        case 'PROFILE_FETCHING':
          /** @desc
           *    invoke a fetch promise to get data from server's `/profile` route;
           *    if resolved, search history will be stored in state machine's context
           */

          _startAnimation()

          return
        case 'READY':
          /** @desc
           *    the state machine reachs here only when `/profile` promise is resolved
           */

          /* update screeen's `userInfo` state accordingly to the `AppService` context */
          setUserInfo(appMState.context.userProfile)

          // console.log('Received user info')
          // console.log(appMState.context.userProfile)

          _stopAnimation()

          return
        case 'FAILURE':
          /* getting back to LoginScreen without giving user an error message is a bit rude  
             凸( •̀_•́ )凸
          */
          // @ts-ignore
          // navigation.navigate('Index')
          return
      }
    })(appMState.value)
  }, [appMState])

  return (
    <GradientContainer flexDirection={'column'}>
      <View style={styles.container}>
        <View style={styles.content}>
          {/* HEADER BANNER */}
          <View style={styles.header}>
            <StyledText fontWeight="bold" style={styles.headerText}>
              {i18n.t('aboutMe._nav')}
            </StyledText>
          </View>
          {/* END: HEADER BANNER */}

          <View style={styles.information}>
            <View style={styles.nameContainer}>
              {/* USER'S FULL NAME */}
              <StyledText fontWeight="bold" style={styles.name}>
                {userInfo.fullName}
              </StyledText>
              {/* END: USER'S FULL NAME */}
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <StyledText fontWeight="bold" style={styles.addition}>
                  {i18n.t('aboutMe.additional')}
                </StyledText>
                <FontAwesome
                  name="angle-right"
                  size={17}
                  color="#43B0FF"
                  style={{ paddingLeft: 5 }}
                />
              </TouchableOpacity>
            </View>

            {/* DISPLAY USER PROFILE DATA */}
            <StyledText fontWeight="bold" style={styles.infoText}>{`${i18n.t(
              'aboutMe.bank',
            )}: ${userInfo.bank_id || userInfo.bankId}`}</StyledText>
            <StyledText fontWeight="bold" style={styles.infoText}>{`User ID: ${
              userInfo.user_id || userInfo.userId
            }`}</StyledText>
            <StyledText fontWeight="bold" style={styles.infoText}>{`${i18n.t(
              'aboutMe.email',
            )}: ${userInfo.email}`}</StyledText>
            <StyledText fontWeight="bold" style={styles.infoText}>{`${i18n.t(
              'aboutMe.phoneNum',
            )}: ${userInfo.phone}`}</StyledText>
          </View>

          <Line></Line>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={_logoutButtonOnClicked}
            >
              <StyledText fontWeight="bold" style={styles.buttonText}>
                {i18n.t('aboutMe.signOutBtn')}
              </StyledText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={() => setModalVisible(true)}
            >
              <StyledText fontWeight="bold" style={styles.buttonText}>
                {i18n.t('aboutMe.changePassBtn')}
              </StyledText>
            </TouchableOpacity>
          </View>
        </View>
        {/* LOADING INDICATOR ANIMATION */}

        <BlurView
          intensity={80}
          tint={'dark'}
          style={[
            {
              zIndex: blurIndex,
              opacity: blurOpacity,
              height: normaliseV(1400),
              width: normaliseH(1290),
              top: normaliseV(140),
              position: 'absolute',
              borderRadius: 15,
            },
          ]}
        ></BlurView>
        <Animated.View
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
        {/* END: LOADING INDICATOR ANIMATION */}
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.modalContentHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setModalVisible(false)}
              >
                <MaterialIcons name="arrow-back" size={32} color="black" />
              </TouchableOpacity>
              <StyledText
                fontWeight="bold"
                style={styles.modalContentHeaderText}
              >
                {i18n.t('aboutMe.changePassBtn')}
              </StyledText>
            </View>
            <View style={styles.inputFieldContainer}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    // validation code-block
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                    maxLength={14}
                    // END validation code-block
                    style={styles.inputField}
                    placeholder={i18n.t('changePassword.oldPassInput')}
                    secureTextEntry
                  />
                )}
                name="oldPassword"
                rules={{
                  required: true,
                  minLength: 6,
                  pattern: /([0-9])/,
                }}
                defaultValue=""
              />
              {_showErrorMessage(errors.oldPassword?.type, 'oldPassword')}

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    // validation code-block
                    onChangeText={(value) => {
                      onChange(value)
                      setNewPassword(value)
                    }}
                    onBlur={onBlur}
                    value={value}
                    maxLength={14}
                    // End of validation code-block
                    style={styles.inputField}
                    placeholder={i18n.t('changePassword.newPassInput')}
                    secureTextEntry
                  />
                )}
                name="newPassword"
                rules={{
                  required: true,
                  minLength: 6,
                  pattern: /([0-9])/,
                }}
                defaultValue=""
              />
              {_showErrorMessage(errors.newPassword?.type, 'newPassword')}

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    // validation code-block
                    onChangeText={(value) => {
                      onChange(value)
                      setRepeatPassword(value)
                    }}
                    onBlur={onBlur}
                    value={value}
                    maxLength={14}
                    // End of validation code-block
                    style={styles.inputField}
                    placeholder={i18n.t('changePassword.confirmPassInput')}
                    secureTextEntry
                  />
                )}
                name="repeatNewPassword"
                rules={{
                  required: true,
                  minLength: 6,
                  pattern: /([0-9])/,
                }}
                defaultValue=""
              />
              {_showErrorMessage(
                errors.repeatNewPassword?.type,
                'repeatPassword',
              )}

              <TouchableOpacity
                style={styles.modalContentButton}
                onPress={handleSubmit(_confirmButtonOnSubmit)}
              >
                <Text>{i18n.t('changePassword.submitBtn')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </GradientContainer>
  )
}

const Line = () => {
  return <View style={styles.line}></View>
}

const styles = StyleSheet.create({
  line: {
    height: 3,
    borderRadius: 100,
    width: 75 + '%', /////////////////////////////////////////
    alignSelf: 'center',
    backgroundColor: '#e6e6e6',
    marginTop: normalise(20),
  },
  container: {
    flex: 1,
    width: 100 + '%', /////////////////////////////////////////
    alignItems: 'center',
    paddingTop: normaliseV(140),
  },
  content: {
    backgroundColor: 'white',
    width: (SCREEN_WIDTH / 10) * 9.4, ////////////////////////////////////
    height: (SCREEN_HEIGHT / 10) * 7, ////////////////////////////////////
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
  header: {
    flex: 0.12,
    justifyContent: 'flex-end',
    paddingBottom: normalise(10),
  },
  headerText: {
    fontSize: normalise(29),
    paddingTop: normaliseV(40),
    color: 'black',
  },
  information: {
    flex: 0.41,
    justifyContent: 'space-around',
    marginTop: normaliseV(20),
  },

  button: {
    flex: 0.47,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: normalise(21),
    color: 'black',
  },
  addition: {
    fontSize: normalise(12.8),
    color: '#43B0FF',
    lineHeight: 20,
  },
  infoText: {
    fontSize: normalise(14.4),
    color: 'black',
  },

  logoutButton: {
    borderWidth: 2,
    width: 100 + '%', //////////////////////////////////////
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalise(30),
    alignSelf: 'center',
    borderRadius: 7,
  },
  changePasswordButton: {
    borderWidth: 2,
    width: 100 + '%', //////////////////////////////////////
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 7,
  },
  buttonText: {
    fontSize: normalise(18),
    color: 'black',
    lineHeight: 30,
  },

  //Setting up modal
  modalBackground: {
    position: 'absolute',
    width: SCREEN_WIDTH, //////////////////////////////////////
    height: SCREEN_HEIGHT, //////////////////////////////////////
    backgroundColor: 'rgba(0, 0, 0, 0.57)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    position: 'absolute',
    width: (SCREEN_WIDTH / 10) * 8.5, ////////////////////////////
    height: (SCREEN_HEIGHT / 10) * 6.5, ////////////////////////////
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  modalContentHeader: {
    flex: 0.15,
    alignItems: 'center',
    paddingBottom: normalise(10),
    flexDirection: 'row',
    borderTopEndRadius: 20,
  },
  inputFieldContainer: {
    flex: 0.85,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  inputField: {
    textAlign: 'center',
    height: normalise(50),
    marginVertical: 15,
    width: 80 + '%', //////////////////////////////////
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: normalise(17),
    alignSelf: 'center',
  },
  modalContentButton: {
    marginTop: normalise(20),
    borderWidth: 2,
    width: 65 + '%', ///////////////////////////////////
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 7,
  },
  modalContentHeaderText: {
    fontSize: normalise(24),
    fontWeight: '600',
    color: 'black',
    lineHeight: 50,
  },
  backButton: {
    padding: 15,
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
  animatedContainer: {},
  animatedNoticeContainer: {
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    top: normaliseV(640),
    width: normaliseH(550),
    height: normaliseV(350),
    backgroundColor: 'black',
    position: 'absolute',
  },
})
