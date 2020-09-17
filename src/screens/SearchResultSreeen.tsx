import i18n from '../i18n'
import React, { Component, useContext, useEffect, useState } from 'react'
import { AppMachineContext } from '../contexts'
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  Animated,
  ActivityIndicator,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'

import { SearchResultScreenNavigationProps } from '../@types/navigation'

import UserCreditInfoCard from '../components/UserCreditInfoCard'
import { GradientContainer, StyledText } from '../../src/components/atomic/'
import { BlurView } from 'expo-blur'

import {
  normaliseH,
  normaliseV,
  normalise,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../helpers'

export default function SearchResultScreen() {
  const [appMState, appMSend] = useContext(AppMachineContext)
  const nav = useNavigation<SearchResultScreenNavigationProps>()
  const route = useRoute()

  const { phone, score } = route.params as {
    phone: string
    score: string | number
  }

  const _goBack = () => {
    console.log(
      `Currently in SearchResultScreen; Machine\'s state: ${appMState.value}`,
    )
    
    nav.navigate('Search')
  }

  useEffect(() => {
    appMSend('MoveOn')
    /* update `AppService` accordingly */
    console.log(
      `Search result: <phone number: ${phone}>; credit score: ${JSON.stringify(score)}, of type ${typeof score}`,
    )
  }, [appMState])

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
              <StyledText fontWeight="bold" style={styles.headerText}>
                {i18n.t('signUp.backTxt')}
              </StyledText>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            {/* <RNFadedScrollView> */}
            <UserCreditInfoCard
              phoneNumber={phone}
              creditScore={score as number}
            />
            {/* </RNFadedScrollView> */}
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
              height: normaliseV(1630),
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
    alignItems: 'center',
  },
  header: {
    flex: 0.15,
    justifyContent: 'center',
    borderTopEndRadius: 15,
    paddingLeft: 10,
  },
  headerText: {
    fontSize: normalise(20),
    marginLeft: 8,
    color: 'black',
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
  animatedContainer: {},
  animatedNoticeContainer: {
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    top: normaliseV(850),
    width: normaliseH(550),
    height: normaliseV(350),
    backgroundColor: 'black',
    position: 'absolute',
  },
})
