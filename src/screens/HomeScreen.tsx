import i18n from '../i18n'
import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome, Entypo } from '@expo/vector-icons'

import { HomeScreenNavigationProps } from '../@types/navigation'

import GradientContainer from '../components/atomic/GradientContainer'
import UserCreditInfoCard from '../components/UserCreditInfoCard'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LoginScreen } from '.'

//Import normalise
import { normalise } from '../../src/helpers/Constants'
import Swiper from 'react-native-swiper'
import { normaliseV } from '../helpers'

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

          <Swiper
            scrollEnabled={true}
            showsButtons
            nextButton={
              <View
                style={{
                  justifyContent: 'center',
                  width: 80,
                  height: 55,
                  marginRight: -60,
                  marginTop: normaliseV(-732),
                  borderRadius: 50,
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                }}
              >
                <Entypo
                  name="chevron-right"
                  size={normalise(29)}
                  color="white"
                  style={{ paddingLeft: normalise(2) }}
                />
              </View>
            }
            prevButton={
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  width: 80,
                  height: 55,
                  marginLeft: -60,
                  marginTop: normaliseV(-732),
                  borderRadius: 50,
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                }}
              >
                {/* <FontAwesome
                  name="arrow-left"
                  size={24}
                  color="white"
                  style={{ paddingRight: 5 }}
                /> */}

                <Entypo
                  name="chevron-left"
                  size={normalise(29)}
                  color="white"
                  style={{ paddingRight: normalise(2) }}
                />
              </View>
            }
            dot={
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,.2)',
                  width: 5,
                  height: 5,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: 'green',
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }
            // activeDotColor={'transparent'}
            // dotColor={'transparent'}
            loop={false}
            loadMinimal={true}
          >
            <UserCreditInfoCard phoneNumber="0967162652" />

            <UserCreditInfoCard phoneNumber="0904586221" />

            <UserCreditInfoCard phoneNumber="0955586221" />
          </Swiper>
        </View>

        <View style={styles.footer}></View>
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
    width: 400,
    backgroundColor: 'transparent',
    marginHorizontal: 30,
    borderWidth: 3,
    borderRadius: 20,
    flexDirection: 'column',
  },
  footer: {
    flex: 0.08,
  },
  userInfoCardContainer: {
    overflow: 'hidden',
    width: (SCREEN_WIDTH / 10) * 9.4, //////////////////////////////////////////////
    height: (SCREEN_HEIGHT / 10) * 8.5, //////////////////////////////////////////////
    alignSelf: 'center',
    marginBottom: 22,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  scrollViewStyle: {
    flex: 0.85,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
})
