import i18n from '../i18n'
import React, { useState, useContext } from 'react'
import { StyleSheet, Text, Image } from 'react-native'
import { Content, View } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SharedElement } from 'react-native-shared-element'
import { useNavigation } from '@react-navigation/native'
// import Animated, { useCode } from 'react-native-reanimated'

import { WelcomeScreenNavigationProps } from '../@types/navigation'
import LoginForm from '../components/forms/LoginForm'
import { GradientContainer, StyledText } from '../components/atomic/'
import { Colours, Fonts } from '../styles'
import { SignInNavContext } from '../contexts'
import { normalise, scaleImageByScreenDimensions } from '../../src/helpers/'
import { getCachedImageUri, runReanimatedTiming as runTiming } from '../utils/'

// const { Value, set } = Animated

const LOGO_IMAGE_PATH = '../../assets/images/logo.png'

export default function LoginScreen() {
  const nav = useNavigation<WelcomeScreenNavigationProps>()

  /* events triggered when `Sign Up` text link is clicked are defined here */
  const _signInTxtOnPressed = () => {
    nav.navigate('SignUp')
  }

  const _goBack = () => {
    /* see CHANGELOG of 01/09/2020 */
    nav.navigate('Welcome')
  }

  return (
    <GradientContainer flexDirection={'column'}>
      <Content scrollEnabled={false} contentContainerStyle={styles.contentContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <SharedElement id="logo">
            <Image
              style={styles.logo}
              source={{
                uri: getCachedImageUri(require(LOGO_IMAGE_PATH)),
              }}
            />
          </SharedElement>
        </View>
        {/* END Logo */}
        {/* Account Identifier & Password input fields + Link to `ForgotPassword` screen */}
        <SignInNavContext.Provider value={nav}>
          {/* Touchable 'Back' link */}

          {/* END Touchable 'Back' link */}
          <LoginForm />
        </SignInNavContext.Provider>
        {/* END Account Identifier & Password input fields + Link to `ForgotPassword` screen */}

      </Content>
    </GradientContainer>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 0.97,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpTxtContainer: {
    flex: 1,
    flexDirection: 'row',
    width: 100 + '%',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'flex-end',
  },
  logo: { 
    ...scaleImageByScreenDimensions(require(LOGO_IMAGE_PATH), 0.75) 
  },
  logoContainer: {
    // PLEASE DO NOT EDIT THIS!
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 17 + '%',
    paddingBottom: '5%'
  },
  backContainer: {
    backgroundColor: 'green',
    flex: 0.5, // !! DANGEROUR ZONE FOR EDITTING !!
    flexDirection: 'row',
    width: 80 + '%',
    paddingVertical: 16,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
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
    shadowOffset: {
      width: 1.25,
      height: 1.25,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.12,
    elevation: 3,
    alignSelf: 'flex-end',
  },
  forgetPasswordTxt: {
    fontSize: 15,
    color: Colours.White,
    paddingTop: 10,
    textAlign: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
})
