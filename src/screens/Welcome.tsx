import i18n from '../i18n'
import React, { useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import { View, Content } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { SharedElement } from 'react-navigation-shared-element'

import Fonts from '../styles/fonts'
import { normalise } from '../../src/helpers/Constants'
import { Dashline, GradientContainer } from '../components/atomic/index'

export default function WelcomeScreen() {
  const nav = useNavigation()
  const _transit = () => { nav.navigate('Login') }
  useEffect(() => {
    //setTimeout(() => nav.push('Login', { id: 'LogoText' }), 1000)
  }, [])

  return (
    <GradientContainer flexDirection={'column'}>
      <Content contentContainerStyle={styles.contentContainer}>
        <View>
          <Text style={styles.subtxt}>{'\n' + i18n.t('welcome.subtext')}</Text>
        </View>
        <Dashline stretch bottom />
          <SharedElement id="logo">
            <Text onPress={_transit} style={styles.logo}>Crescorex</Text>
          </SharedElement>
        <Dashline stretch bottom />
      </Content>
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
    fontSize: normalise(30),
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
  logo: {
    color: 'white',
    fontSize: normalise(80),
    shadowOffset: {
      width: -3,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
})
