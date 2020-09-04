import i18n from '../i18n'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Animated,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { SearchScreenNavigationProps } from '../@types/navigation'

import GradientContainer from '../components/atomic/GradientContainer'
import { HomeScreenNavigationProps } from '../@types/navigation'

//Import normalise
import { normalise } from '../../src/helpers/Constants'
import { normaliseH, normaliseV } from '../helpers'

import StyledText from '../../src/components/atomic/StyledText'

//Get devices's dimension
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function SeacrhScreen() {
  const navigation = useNavigation<SearchScreenNavigationProps>()
  const heightView = useState(new Animated.Value(normaliseV(700)))[0]
  const marginTop = useState(new Animated.Value(normaliseV(400)))[0]
  const opacity = useState(new Animated.Value(0))[0]
  const [buttonText, setButtonText] = useState('Gửi mã OTP')

  const animatedContainer = {
    backgroundColor: 'white',
    width: 94 + '%',
    height: heightView,
    alignSelf: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.44,
    shadowRadius: 6.27,
    elevation: 10,
    paddingHorizontal: normaliseH(40),
  }

  const [isEnabled, setTextInputStatus] = useState(false)

  function showOtpInput() {
    Animated.timing(heightView, {
      toValue: normaliseV(950),
      duration: 700,
      useNativeDriver: false,
    }).start()
    Animated.timing(marginTop, {
      toValue: normaliseV(650),
      duration: 700,
      useNativeDriver: false,
    }).start()
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: 300,
      useNativeDriver: false,
    }).start()

    setTextInputStatus(true)
    setButtonText(i18n.t('search.submitBtn'))
  }

  return (
    <GradientContainer flexDirection={'column'}>
      <View style={styles.container}>
        <Animated.View style={animatedContainer}>
          <StyledText fontWeight="bold" style={styles.headerText}>
            {i18n.t('search._nav')}
          </StyledText>
          <TextInput
            style={styles.inputPhone}
            placeholder={i18n.t('search.phoneNumInput')}
          />

          <Animated.View style={{ opacity: opacity }}>
            <TextInput
              editable={isEnabled}
              style={{
                fontFamily: 'ComfortaaRegular', // Test
                lineHeight: 17,
                textAlign: 'center',
                height: normalise(50),
                marginVertical: normalise(15),
                width: 100 + '%',
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 30,
                paddingHorizontal: normaliseV(20),
                alignSelf: 'center',
              }}
              placeholder={i18n.t('search.otpCodeInput')}
            />
          </Animated.View>

          <Animated.View
            style={{
              marginTop: marginTop,
              width: 40 + '%',
              position: 'absolute',
              alignSelf: 'center',
            }}
          >
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                if (isEnabled) {
                  navigation.navigate('SearchResult', { phone: undefined })
                } 
                  showOtpInput()
              }}
            >
              <StyledText fontWeight="bold" style={styles.searchText}>
                {buttonText}
              </StyledText>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </GradientContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 100 + '%',
    paddingTop: normaliseV(140),
  },
  content: {},

  headerText: {
    fontSize: normalise(29),
    paddingTop: normaliseV(56),
    color: 'black',
  },
  inputPhone: {
    fontFamily: 'ComfortaaRegular', // Test
    lineHeight: 17,
    textAlign: 'center',
    height: normalise(50),
    marginVertical: normalise(15),
    width: 100 + '%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingHorizontal: normaliseV(20),
    alignSelf: 'center',
    marginTop: normaliseV(70),
  },
  inputOtp: {},
  searchButton: {
    marginTop: normaliseV(70),
    borderWidth: 2,
    width: 100 + '%',
    height: normaliseV(140),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 7,
  },
  searchText: {
    fontSize: normalise(13.6),
    color: 'black',
  },
})
