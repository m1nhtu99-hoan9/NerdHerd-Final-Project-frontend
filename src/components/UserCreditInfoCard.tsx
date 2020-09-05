import i18n from '../i18n'
import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Picker,
  TouchableOpacity,
} from 'react-native'
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { Container } from 'native-base'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import { normalise, normaliseV, normaliseH } from '../../src/helpers'
import StyledText from '../../src/components/atomic/StyledText'
import TextInputIcon from '../components/atomic/TextInputIcon'

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

  const placeholderLoanType = {
    label: i18n.t('home.loanOptionsInput'),
    value: null,
    color: '#9EA0A4',
  }

  const placeholderDuration = {
    label: 'Chọn thời hạn vay',
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
            <View style={styles.phoneNumContainer}>
              <StyledText fontWeight="regular" style={styles.phoneNum}>
                {phoneNumber}
              </StyledText>
            </View>

            <Line></Line>

            <View style={styles.creditScoreContainer}>
              <StyledText fontWeight="bold" style={styles.creditScoreHeader}>
                {i18n.t('home.firstSubHeader')}
              </StyledText>
              <RNSpeedometer value={creditScore} size={200} />
              <StyledText fontWeight="regular" style={styles.creditScoreNote}>
                {i18n.t('home.suggestionContent.middle')}
              </StyledText>
            </View>

            <Line></Line>

            <View style={styles.loanDetailContainer}>
              <StyledText fontWeight="bold" style={styles.loanDetailHeader}>
                {i18n.t('home.secondSubHeader')}
              </StyledText>
              <StyledText fontWeight="regular" style={styles.loanDetailResult}>
                Content goes here
              </StyledText>

              <View style={styles.loanType}>
                <RNPickerSelect
                  placeholder={placeholderLoanType}
                  onValueChange={(value: string) => console.log(value)}
                  items={[
                    { label: 'Football', value: 'football' },
                    { label: 'Baseball', value: 'baseball' },
                    { label: 'Hockey', value: 'hockey' },
                  ]}
                />
                <TextInputIcon></TextInputIcon>
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
              <StyledText fontWeight="bold" style={styles.loanDetailHeader}>
                {i18n.t('home.recommendContent.header')}
              </StyledText>
              <StyledText fontWeight="regular" style={styles.loanDetailResult}>
                Content goes here
              </StyledText>

              <View
                style={styles.loanType}
                onTouchEnd={() => console.log('Pressed')}
              >
                <RNPickerSelect
                  placeholder={placeholderLoanType}
                  onValueChange={(value: undefined) => console.log(value)}
                  items={[
                    { label: 'Football', value: 'football' },
                    { label: 'Baseball', value: 'baseball' },
                    { label: 'Hockey', value: 'hockey' },
                  ]}
                />
                <TextInputIcon></TextInputIcon>
              </View>

              <View style={styles.loanType}>
                <RNPickerSelect
                  placeholder={placeholderDuration}
                  onValueChange={(value: string) => console.log(value)}
                  items={[
                    { label: 'Football', value: 'football' },
                    { label: 'Baseball', value: 'baseball' },
                    { label: 'Hockey', value: 'hockey' },
                  ]}
                />
                <TextInputIcon></TextInputIcon>
              </View>

              <TextInput
                style={styles.loanAmount}
                placeholder={i18n.t('home.loanAmountInput')}
              />

              <TouchableOpacity style={styles.buttonNext}>
                <StyledText fontWeight="bold" style={styles.buttonText}>
                  {i18n.t('home.recommendContent.submitBtn')}
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
  // ------------------------------------ Header field
  phoneNumContainer: {
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
  // ------------------------------------ Credit score field
  creditScoreContainer: {
    width: 100 + '%',
    height: 320,
    justifyContent: 'space-between',
    paddingHorizontal: normaliseH(40),
  },
  creditScoreHeader: {
    fontSize: normalise(20),
    paddingTop: normaliseV(30),
    color: 'black',
  },

  creditScoreNote: {
    paddingTop: 60,
    paddingBottom: 15,
    fontSize: normalise(13),
    color: 'black',
  },

  // ------------------------------------ Loan detail field
  loanDetailContainer: {
    height: 380,
    width: 100 + '%',
    paddingHorizontal: normaliseH(40),
  },
  loanDetailHeader: {
    fontSize: normalise(20),
    paddingTop: normaliseV(30),
    color: 'black',
  },
  loanDetailResult: {
    fontSize: normalise(13),
    paddingTop: normaliseV(30),
    color: 'black',
  },

  loanType: {
    height: 50,
    marginVertical: 20,
    width: 80 + '%',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingLeft: 20,
    alignSelf: 'center',
    alignItems: 'center',
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
  // ------------------------------------ Recommend field
  recommendContainer: {
    height: 500,
    width: 100 + '%',
    paddingHorizontal: normaliseH(40),
  },
})
