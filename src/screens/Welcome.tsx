import i18n from '../i18n'
import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Content, Text } from 'native-base'
import { Dashline, GradientContainer } from '../components/atomic/index'

export default function WelcomeScreen() {
  return (
    <GradientContainer flexDirection={'column'}>
      <Content contentContainerStyle={styles.contentContainer}>
        <View>
          <Text style={styles.subtxt}>{i18n.t('welcome.subtext')}</Text>
        </View>
        <Dashline stretch bottom />
        <Text style={styles.logo}>Crescorex</Text>
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
    fontSize: 26,
    color: 'white',
    letterSpacing: 0.3,
    fontWeight: '600',
    paddingBottom: 12,
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
    fontSize: 80,
    shadowOffset: {
      width: -3,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
})
