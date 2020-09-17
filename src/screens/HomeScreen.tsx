import i18n from '../i18n'
import React, { Component, useContext, useEffect, useState } from 'react'
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
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { Colours, Fonts } from '../styles/'
import { GradientContainer, StyledText } from '../components/atomic/'

import Swiper from 'react-native-swiper'
import Svg, { Rect } from 'react-native-svg'
import ContentLoader from 'react-native-masked-loader'
import UserCreditInfoCard from '../components/UserCreditInfoCard'
import { BlurView } from 'expo-blur'

import { AppMachineContext } from '../contexts'

import { WelcomeScreenNavigationProps } from '../@types/navigation'
import { useNavigation } from '@react-navigation/native'

import {
  normalise,
  normaliseV,
  normaliseH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../src/helpers'

/* hide warning boxes */
console.disableYellowBox = true

// const getMaskedElement = (appStatus: boolean) => {
//   // If the app is loading
//   if (appStatus) {
//     return (
//       <Svg height={800} width="100%" fill={'black'}>
//         <Rect x="0" y="0" width="100%" height="100%" />
//       </Svg>
//     )
//   } else {
//     return
//   }

//   // If the app is loaded
// }

export default function HomeScreen() {
  // consume XState service hooks
  const [appMState, appMSend] = useContext(AppMachineContext)
  const navigation = useNavigation<WelcomeScreenNavigationProps>()

  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([])
  const [card1, setCard1] = useState<SearchResult>({})
  const [card2, setCard2] = useState<SearchResult>({})
  const [card3, setCard3] = useState<SearchResult>({})

  /* states for loading animation */
  const [isLoading, setLoading] = useState(true)
  const [blurOpacity, setBlurOpacity] = useState(0)
  const [blurIndex, setBlurIndex] = useState(-2)
  const opacity = useState(new Animated.Value(0))[0]
  const noticeOpacity = useState(new Animated.Value(0))[0]
  const [animatedIndex, setAnimatedIndex] = useState(-2)

  const _fireLoading = () => {
    Animated.timing(opacity, {
      toValue: 0.6,
      duration: 500,
      useNativeDriver: false,
    }).start()
    Animated.timing(noticeOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false,
    }).start()
  }

  const _fireUnloading = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start()
    Animated.timing(noticeOpacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start()
  }

  const _stopAnimation = () => {
    setAnimatedIndex(-2)
    setLoading(false)
    setBlurOpacity(0)
    _fireUnloading
  }
  const _startAnimation = () => {
    setAnimatedIndex(2)
    _fireLoading()
    setBlurOpacity(1)
    setLoading(true)
  }

  useEffect(() => {
    // IIFE
    ;(function (state) {
      switch (state) {
        case 'UNAUTHORISED':
          /** @desc rarely happens but still possible */

          navigation.navigate('Login')
          return
        case 'LOGGED_IN':
          /** @desc the user is led here after logging in successfully */

          /* transit to `PROFILE_FETCHING` state */
          appMSend('MoveOn')

          return
        case 'PROFILE_FETCHING':
          /** @desc
           *    invoke a fetch promise to get data from server's `/profile` route;
           *    if resolved, search history will be stored in state machine's context
           */

          /* start loading indicator animation */
          _startAnimation()

          return
        case 'READY':
          /** @desc
           *    the state machine reachs here only when `/profile` promise is resolved
           */

          /* stop loading indicator animation */
          _stopAnimation()

          /* update screeen's `searchHistory` state accordingly to the `AppService` context */
          setSearchHistory(appMState.context.searchHistory)

          // setCard1, setCard2, setCard3
          if (searchHistory.length < 3) {
            switch (searchHistory.length) {
              case 2: 
                setCard1(searchHistory[1])
                setCard2(searchHistory[0])
                break
              case 1: 
                setCard1(searchHistory[0])
                break
            }
          } else {
            setCard1(searchHistory[searchHistory.length - 1])
            setCard2(searchHistory[searchHistory.length - 2])
            setCard3(searchHistory[searchHistory.length - 3])
          }

          console.log(appMState.context.searchHistory)
          console.log(appMState.context.userProfile)
          return
        case 'FAILURE':
          /* getting back to LoginScreen without giving user an error message is a bit rude  
             but it's okey for now, I reckon 凸( •̀_•́ )凸
          */
          navigation.navigate('Login')
          return
      }
    })(appMState.value)
  }, [appMState.value])

  return (
    <GradientContainer flexDirection={'column'}>
      <View style={styles.container}>
        <View style={styles.userInfoCardContainer}>
          <View style={styles.header}>
            <StyledText fontWeight="bold" style={styles.headerText}>
              {i18n.t('home.header')}
            </StyledText>
          </View>
          {/* SEARCH HISTORY :: CUSTOMER'S CREDIT INFO VIEW CARDS */}
          <Swiper
            scrollEnabled={false}
            showsButtons
            nextButton={<NextButton />}
            prevButton={<PrevButton />}
            dot={<BreadcrumbDot />}
            activeDot={<BreadcrumbActiveDot />}
            // activeDotColor={'transparent'}
            // dotColor={'transparent'}
            loop={false}
            loadMinimal={true}
          >
            {!!card1 && (<UserCreditInfoCard phoneNumber={Object.values(card1)[0] as string} creditScore={Object.values(card1)[1] as number}/>)}
            {!!card2 && (<UserCreditInfoCard phoneNumber={Object.values(card2)[0] as string} creditScore={Object.values(card2)[1] as number}/>)}
            {!!card3 && (<UserCreditInfoCard phoneNumber={Object.values(card3)[0] as string} creditScore={Object.values(card3)[1] as number}/>)}
            {/*
              // render if search history has more than 1 elements
              !!searchHistory.length &&
                searchHistory.map((element: SearchResult) => (
                  <UserCreditInfoCard
                    key={element.phone as string}
                    phoneNumber={element.phone as string}
                    creditScore={element.score as number}
                  />
                ))
            */}
          </Swiper>
          {/* END: SEARCH HISTORY :: CUSTOMER'S CREDIT INFO VIEW CARDS */}

          {/* LOADING INDICATOR ANIMATION */}
          <Animated.View
            style={[
              styles.animatedContainer,
              { opacity: opacity, zIndex: animatedIndex },
            ]}
          >
            {/** Masked container for loading indicator animation */}
          </Animated.View>
          <BlurView
            intensity={100}
            tint={'dark'}
            style={[
              StyleSheet.absoluteFill,
              { zIndex: blurIndex, opacity: blurOpacity },
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
          {/* <ContentLoader
            MaskedElement={() => getMaskedElement(appStatus)}
            dir={'ltr'}
            duration={1000}
            forColor="#fafafa"
            backColor="lightgray"
          /> */}
        </View>

        <View style={styles.footer}>
          {/* <LinearGradient
            style={{
              position: 'absolute',
              bottom: normaliseV(72),
              borderRadius: 15,
              width: 94 + '%',
              alignSelf: 'center',
              height: 30,
            }}
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']}
            pointerEvents={'none'}
          /> */}
        </View>
      </View>
    </GradientContainer>
  )
}

const NextButton = function () {
  return (
    <View
      style={{
        justifyContent: 'center',
        width: normaliseH(280),
        height: normaliseV(180),
        marginRight: normaliseH(-195),
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
      }}
    >
      <Entypo
        name="chevron-right"
        size={normalise(29)}
        color="white"
        style={{ paddingLeft: normalise(4) }}
      />
    </View>
  )
}

const PrevButton = function () {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: normaliseH(280),
        height: normaliseV(180),
        marginLeft: normaliseH(-195),
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
        size={normalise(32)}
        color="white"
        style={{ paddingRight: normalise(4) }}
      />
    </View>
  )
}

const BreadcrumbDot = function () {
  return (
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
  )
}

const BreadcrumbActiveDot = function () {
  return (
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.44,
    shadowRadius: 6.27,
    elevation: 10,
    paddingTop: normaliseV(140),
  },
  header: {
    flex: 0.15,
    backgroundColor: Colours.White, // RIP Old Colour: '#009591',
    borderTopEndRadius: 15,
    paddingHorizontal: normaliseH(40),
  },
  headerText: {
    fontSize: normalise(29),
    paddingTop: normaliseV(50),
    color: 'black',
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
    width: (SCREEN_WIDTH / 10) * 9.4,
    height: (SCREEN_HEIGHT / 10) * 8.2,
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
  animatedContainer: {
    backgroundColor: 'black',
    width: 126 + '%',
    height: 173 + '%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: normaliseH(-140),
    top: normaliseV(-720),
  },
  animatedNoticeContainer: {
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    top: normaliseV(680),
    width: normaliseH(550),
    height: normaliseV(350),
    backgroundColor: 'black',
    position: 'absolute',
  },
})
