import i18n from '../i18n'
import React, { useEffect } from 'react'
import { StyleSheet, Image, TextStyle } from 'react-native'
import { View, Content, Text } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { SharedElement } from 'react-navigation-shared-element'
import * as R from 'ramda'

import { Colours, Fonts } from '../styles'
import { getCachedImageUri } from '../utils'
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  normalise,
  normaliseH,
  scaleImageByScreenDimensions,
} from '../../src/helpers/'
import { GradientContainer, GradientText } from '../components/atomic'
import { color } from 'react-native-reanimated'

const LOGO_IMAGE_PATH = '../../assets/images/logo.png'

export default function WelcomeScreen() {
  const nav = useNavigation()
  const _transit = () => {
    nav.navigate('Login')
  }

  useEffect(() => {
    //setTimeout(() => nav.navigate('Login'), 1000)
  }, [])

  return (
    <GradientContainer flexDirection={'column'}>
      <View style={styles.contentContainer}>
        <WelcomeHeader />
        {/* SignIn & SignUp buttons */}
        <View style={styles.btnsContainer}>
          <View
            style={{
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={[styles.btnContainer, { backgroundColor: Colours.White }]}
              onPress={() => {
                nav.navigate('Login')
              }}
            >
              <GradientText style={styles.btnTxt}>
                {i18n.t('signIn.submitBtn')}
              </GradientText>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                nav.navigate('SignUp')
              }}
            >
              <GradientText style={styles.btnTxt}>
                {i18n.t('signUp.submitBtn')}
              </GradientText>
            </TouchableOpacity>
          </View>
        </View>
        {/* END SignIn & SignUp buttons */}
        <WelcomeFooter />
      </View>
    </GradientContainer>
  )
}

const WelcomeHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.subtxt}>{'\n' + i18n.t('welcome.subtext')}</Text>
      <TouchableOpacity style={styles.logoContainer}>
        <SharedElement id="logo">
          <Image
            style={styles.logo}
            source={{
              uri: getCachedImageUri(require(LOGO_IMAGE_PATH)),
            }}
          />
        </SharedElement>
      </TouchableOpacity>
    </View>
  )
}

const WelcomeFooter = () => {
  const StyledText = ({
    children,
    style,
  }: {
    children: string
    style?: TextStyle
  }) => (
    <Text
      style={{
        //fontFamily: Fonts.PrimaryRegular,
        fontSize: normalise(14),
        color: Colours.White,
        ...style,
      }}
    >
      {children}
    </Text>
  )

  return (
    <View
      style={[
        styles.headerContainer,
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      <StyledText>{i18n.t('welcome.userAgreement.0')}</StyledText>
      <StyledText style={{ color: '#C71585' }}>
        {i18n.t('welcome.termsOfService')}
      </StyledText>
      <StyledText>{i18n.t('welcome.userAgreement.1')}</StyledText>
      <StyledText style={{ color: '#C71585' }}>
        {i18n.t('welcome.privacyPolicy')}
      </StyledText>
      <StyledText>{i18n.t('welcome.userAgreement.2')}</StyledText>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  btnsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  subtxt: {
    fontFamily: Fonts.PrimaryBold,
    fontSize: normalise(23),
    textAlign: 'center',
    color: 'white',
    paddingBottom: normalise(12),
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logo: scaleImageByScreenDimensions(require(LOGO_IMAGE_PATH), 0.9),
  logoContainer: {
    paddingTop: normaliseH(70),
    shadowOffset: {
      width: -3,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  btnContainer: {
    backgroundColor: '#070B2B', // Anh Phat's colour :(
    alignSelf: 'center',
    borderRadius: 6,
    width: 147,
    height: 52,
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  btnTxt: {
    fontSize: 18,
    fontFamily: Fonts.PrimaryBold,
    textAlign: 'center',
  },
})
