import i18n from '../i18n'
import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

import RNFadedScrollView from 'rn-faded-scrollview'

import { HomeScreenNavigationProps } from '../@types/navigation'

import GradientContainer from '../components/atomic/GradientContainer'
import UserCreditInfoCard from '../components/UserCreditInfoCard'
import { TouchableOpacity } from 'react-native-gesture-handler'
import StyledText from '../../src/components/atomic/StyledText'
import { LoginScreen } from '.'

//Import normalise
import { normalise } from '../../src/helpers/Constants'
import { normaliseH, normaliseV } from '../helpers'

import Swiper from 'react-native-swiper'

/* @TODOs: 
    - [x] (01/08/2020): Just mock-up
*/
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProps>()

  const nav = useNavigation()
  const _goBack = () => {
    nav.goBack()
  }

  return (
    <GradientContainer flexDirection={'column'}>
      <View style={styles.container}>
        <View style={styles.userInfoCardContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={_goBack}
            >
              <AntDesign
                name="left"
                size={normalise(16)}
                color={'black'}
                style={{ alignSelf: 'center' }}
              />
              <StyledText fontWeight='bold' style={styles.headerText}>
                {i18n.t('signUp.backTxt')}
              </StyledText>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <RNFadedScrollView>
              <UserCreditInfoCard phoneNumber="0967162652" />
            </RNFadedScrollView>
          </View>
        </View>
      </View>
    </GradientContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.44,
    shadowRadius: 6.27,
    elevation: 10,
    paddingTop: normaliseV(140),
    alignItems: 'center'
  },
  header: {
    flex: 0.15,
    justifyContent: 'center',
    backgroundColor: '#009591',
    borderTopEndRadius: 15,
    paddingLeft: 10,
  },
  headerText: {
    fontSize: normalise(20),
    marginLeft: 8
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },

  userInfoCardContainer: {
    overflow: 'hidden',
    width: (SCREEN_WIDTH / 10) * 9.4, //////////////////////////////////////////////
    flex: 0.91, //////////////////////////////////////////////
    marginBottom: 22,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.44,
    shadowRadius: 6.27,
    elevation: 10,
  },
  backButtonContainer: {
    flex: 0.1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  backButton: {
    width: 120,
    height: 34,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: 'white',
  },
})
