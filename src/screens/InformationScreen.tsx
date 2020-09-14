import i18n from '../i18n'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  Systrace,
  TextInput,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'

import GradientContainer from '../components/atomic/GradientContainer'
import { HomeScreenNavigationProps } from '../@types/navigation'

//Import normalise
import { normalise } from '../../src/helpers/Constants'

import StyledText from '../../src/components/atomic/StyledText'
import { normaliseH, normaliseV } from '../helpers'

//Import validation
import { useForm, Controller } from 'react-hook-form'

type UserInfo = {
  fullName: string
  bankName: string
  status: 'normal' | 'warned' | '...' | undefined
  email: string
  phone: string
}
//Get devices's dimension
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function InformationScreen() {
  const [modalVisible, setModalVisible] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>({
    fullName: 'Ngo Tai Phat',
    bankName: 'Techcombank',
    status: 'normal',
    email: 'phatxxxxx@gmail.com',
    phone: '094345xxx',
  })

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  interface FormInput {
    oldPassword: string
    newPassword: string
    repeatNewPassword: string
  }

  const navigation = useNavigation<HomeScreenNavigationProps>()
  const { control, handleSubmit, errors, trigger, reset } = useForm<FormInput>()

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
    if (repeatPassword != newPassword)
    {
      return (
        <View style={styles.validationTextContainer}>
          <Text style={styles.validationText}>
            {i18n.t('signIn.validation.invalid')}
          </Text>
        </View>)
    }
  }

  const _confirmButtonOnSubmit = () => {
    setModalVisible(false)
  }

  return (
    <GradientContainer flexDirection={'column'}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <StyledText fontWeight="bold" style={styles.headerText}>
              {i18n.t('aboutMe._nav')}
            </StyledText>
          </View>

          <View style={styles.information}>
            <View style={styles.nameContainer}>
              <StyledText fontWeight="bold" style={styles.name}>
                {userInfo.fullName}
              </StyledText>
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

            <StyledText fontWeight="bold" style={styles.infoText}>{`${i18n.t(
              'aboutMe.bank',
            )}: ${userInfo.bankName}`}</StyledText>
            <StyledText fontWeight="bold" style={styles.infoText}>{`${i18n.t(
              'aboutMe.accStatus',
            )}: ${userInfo.status}`}</StyledText>
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
              onPress={() => {
                navigation.replace('Login', { name: 0 })
              }}
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
                    // End of validation code-block
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
              {_showErrorMessage(errors.oldPassword?.type)}

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    // validation code-block
                    onChangeText={(value) => {onChange(value); setNewPassword(value)} }
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
              {_showErrorMessage(errors.newPassword?.type)}

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    // validation code-block
                    onChangeText={(value) => {onChange(value); setRepeatPassword(value)} }
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
              {_showErrorMessage(errors.repeatNewPassword?.type)}

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
})
