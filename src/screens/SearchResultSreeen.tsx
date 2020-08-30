import i18n from '../i18n'
import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import RNFadedScrollView from 'rn-faded-scrollview'


import { HomeScreenNavigationProps } from '../@types/navigation'

import GradientContainer from '../components/atomic/GradientContainer'
import UserCreditInfoCard from '../components/UserCreditInfoCard'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LoginScreen } from '.'

//Import normalise
import { normalise } from '../../src/helpers/Constants'
import Swiper from 'react-native-swiper'

/* @TODOs: 
    - [x] (01/08/2020): Just mock-up
*/
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProps>()

  return (
    <GradientContainer flexDirection={'column'}>
      <View style={styles.container}>
        <View style={styles.userInfoCardContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{i18n.t('home.header')}</Text>
          </View>
          <View style={styles.content}>
            <RNFadedScrollView>
            <UserCreditInfoCard phoneNumber="0967162652" />
            </RNFadedScrollView>
          </View>
        </View>

        <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text>Quay lai</Text>
      </TouchableOpacity>
      </View>
      </View>

      
    </GradientContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.44,
    shadowRadius: 6.27,
    elevation: 10,
  },
  header: {
    flex: 0.15,
    justifyContent: 'flex-end',
    backgroundColor: '#009591',
    borderTopEndRadius: 15,
  },
  headerText: {
    paddingBottom: normalise(20),
    fontSize: normalise(28),
  },
  content: {
    flex: 0.85,
    overflow: 'hidden'
  },

  userInfoCardContainer: {
    overflow: 'hidden',
    width: (SCREEN_WIDTH / 10) * 9.4, //////////////////////////////////////////////
    flex: 0.8, //////////////////////////////////////////////
    alignSelf: 'center',
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
    paddingBottom: 10
  },
  backButton: {
      width: 120,
      height: 34,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      borderColor: 'white',
  }
})
