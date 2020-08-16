import i18n from '../i18n'
import React, { useEffect } from 'react'
import { StyleSheet, Text, Image } from 'react-native'
import { View, Content } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { SharedElement } from 'react-navigation-shared-element'

import { Colours, Fonts } from '../styles'
import { getCachedImageUri } from '../utils'
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  normalise,
  scaleImageByScreenDimensions,
} from '../../src/helpers/'
import { Dashline, GradientContainer } from '../components/atomic'

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
        <Text style={styles.subtxt}>{'\n' + i18n.t('welcome.subtext')}</Text>
        <TouchableOpacity style={styles.logoContainer}
          onPress={_transit}
        >
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
    </GradientContainer>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtxt: {
    fontFamily: Fonts.PrimaryBold,
    fontSize: normalise(25),
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
  logo: scaleImageByScreenDimensions(require(LOGO_IMAGE_PATH), 0.98),
  logoContainer: {
    shadowOffset: {
      width: -3,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
})
