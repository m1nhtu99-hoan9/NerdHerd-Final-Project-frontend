import i18n from '../i18n'
import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Picker,
} from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { Container } from 'native-base'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import { normalise, normaliseV, normaliseH } from '../../src/helpers'
import StyledText from '../../src/components/atomic/StyledText'

import RNSpeedometer from 'react-native-speedometer'
import RNFadedScrollView from 'rn-faded-scrollview'
import RNPickerSelect from 'react-native-picker-select'

interface UserCreditInfoCardProps {
  phoneNumber: string
  creditScore: number
}

const Line = function () {
  return <View style={styles.line} />
}

export default function UserCreditInfoCard(props: UserCreditInfoCardProps) {
  const { phoneNumber, creditScore } = props
  const [selectedValue, setSelectedValue] = useState('abc')

  const placeholder = {
    label: i18n.t('home.loanOptionsInput'),
    value: null,
    color: '#9EA0A4',
  }

  return (
    <>
      <Container style={styles.content}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={120}
          behavior="padding"
          enabled
        >
          <ScrollView>
            <View style={styles.V_phoneNum}>
              <StyledText fontWeight="regular" style={styles.phoneNum}>
                {phoneNumber}
              </StyledText>
            </View>

            <Line></Line>

            <View style={styles.V_creditScore}>
              <StyledText fontWeight="bold" style={styles.T_creditScoreHeader}>
                {i18n.t('home.firstSubHeader')}
              </StyledText>
              <RNSpeedometer value={creditScore} size={200} />
              <StyledText fontWeight="regular" style={styles.T_creditScoreNote}>
                {i18n.t('home.suggestionContent.middle')}
              </StyledText>
            </View>

            <Line></Line>

            <View style={styles.V_loanDetail}>
              <StyledText fontWeight="bold" style={styles.T_loanDetailHeader}>
                {i18n.t('home.secondSubHeader')}
              </StyledText>
              <StyledText
                fontWeight="regular"
                style={styles.T_loanDetailResult}
              >
                Content goes here
              </StyledText>

              <View style={styles.loanType}>
                <RNPickerSelect
                  placeholder={placeholder}
                  onValueChange={(value) => console.log(value)}
                  items={[
                    { label: 'Football', value: 'football' },
                    { label: 'Baseball', value: 'baseball' },
                    { label: 'Hockey', value: 'hockey' },
                  ]}
                />
                <View
                  style={{
                    position: 'absolute',
                    right: 0,
                    zIndex: -1,
                    borderLeftWidth: 1,
                    width: 50,
                    height: 48,
                    borderTopRightRadius: 35,
                    borderBottomRightRadius: 35,
                    backgroundColor: 'pink',
                  }}
                ></View>
              </View>

              <TextInput
                style={styles.loanAmount}
                placeholder={i18n.t('home.loanAmountInput')}
              />

              <TouchableOpacity style={styles.buttonNext}>
                <StyledText fontWeight="bold" style={styles.buttonText}>
                  {i18n.t('home.submitBtn')}
                </StyledText>
              </TouchableOpacity>
            </View>

            <Line></Line>

            <View style={styles.recommendContainer}>
              <StyledText fontWeight="bold" style={styles.T_loanDetailHeader}>
                {i18n.t('home.secondSubHeader')}
              </StyledText>
              <StyledText
                fontWeight="regular"
                style={styles.T_loanDetailResult}
              >
                Content goes here
              </StyledText>

              <View style={styles.loanType}>
                <RNPickerSelect
                  placeholder={placeholder}
                  onValueChange={(value) => console.log(value)}
                  items={[
                    { label: 'Football', value: 'football' },
                    { label: 'Baseball', value: 'baseball' },
                    { label: 'Hockey', value: 'hockey' },
                  ]}
                />
                <View
                  style={{
                    position: 'absolute',
                    right: 0,
                    zIndex: -1,
                    borderLeftWidth: 1,
                    width: 50,
                    height: 48,
                    borderTopRightRadius: 35,
                    borderBottomRightRadius: 35,
                    backgroundColor: 'pink',
                  }}
                ></View>
              </View>

              <TextInput
                style={styles.loanAmount}
                placeholder={i18n.t('home.loanAmountInput')}
              />

              <TextInput
                style={styles.loanAmount}
                placeholder={i18n.t('home.loanAmountInput')}
              />

              <TouchableOpacity style={styles.buttonNext}>
                <StyledText fontWeight="bold" style={styles.buttonText}>
                  {i18n.t('home.submitBtn')}
                </StyledText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </>
  )
}

const styles = StyleSheet.create({
  line: {
    height: 25,
    width: 100 + '%',
    backgroundColor: '#e3d3d3',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    height: 100,
    justifyContent: 'flex-end',
  },
  headerText: {
    paddingBottom: 20,
    fontSize: 28,
  },
  content: {
    flex: 1,
    width: (SCREEN_WIDTH / 10) * 9.4,
    flexDirection: 'column',
    alignContent: 'center',
  },
  footer: {
    flex: 0.08,
  },
  //Content View
  V_phoneNum: {
    height: 60,
    width: 100 + '%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normaliseH(40),
  },
  phoneNum: {
    fontSize: normalise(30),
    color: 'black',
  },
  ////////
  V_creditScore: {
    width: 100 + '%',
    height: 320,
    justifyContent: 'space-between',
    paddingHorizontal: normaliseH(40),
  },
  T_creditScoreHeader: {
    fontSize: normalise(20),
    paddingTop: normaliseV(30),
    color: 'black',
  },
  Graph_CreditScore: {
    alignSelf: 'center',
  },
  T_creditScoreNote: {
    paddingTop: 60,
    paddingBottom: 15,
    fontSize: normalise(13),
    color: 'black',
  },

  // V_creditScoreHistory: {
  //   width: 100 + '%',
  //   height: 400,
  //   justifyContent: 'space-between'
  // },
  // T_creditScoreHistoryHeader: {
  //   fontSize: 22,
  //   padding: 10
  // },
  // Graph_creditScoreHistory: {
  //   alignSelf: 'center'
  // },
  // T_creditScoreHistoryNote: {
  //   alignSelf: "center",
  //   paddingBottom: 10
  // },

  ///////
  V_loanDetail: {
    height: 380,
    width: 100 + '%',
    paddingHorizontal: normaliseH(40),
  },
  T_loanDetailHeader: {
    fontSize: normalise(20),
    paddingTop: normaliseV(30),
    color: 'black',
  },
  T_loanDetailResult: {
    fontSize: normalise(13),
    paddingTop: normaliseV(30),
    color: 'black',
  },

  loanType: {
    height: 50,
    marginVertical: 20,
    width: 80 + '%',
    backgroundColor: 'transparent',
    justifyContent: "space-between",
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingLeft: 20,
    alignSelf: 'center',
    alignItems:'center',

  },
  loanAmount: {
    height: 50,
    marginVertical: 20,
    width: 80 + '%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 17,
    alignSelf: 'center',
  },
  buttonNext: {
    paddingHorizontal: 40,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 20,
    height: 50,
    width: 170,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'black',
    alignSelf: 'center',
    fontSize: normalise(14),
    lineHeight: 20,
    fontWeight: '600',
  },
  ////////
  recommendContainer: {
    height: 500,
    width: 100 + '%',
    paddingHorizontal: normaliseH(40),
  },
})
