import i18n from '../i18n'
import React, { useState} from 'react'
import { StyleSheet, View, Text, TextInput, Dimensions, KeyboardAvoidingView, Platform, Picker } from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

import RNSpeedometer from "react-native-speedometer";

interface UserCreditInfoCardProps {
  phoneNumber: string
}

const Line = function () {
  return <View style={styles.line} />
}

export default function UserCreditInfoCard (props: UserCreditInfoCardProps) {
  const { phoneNumber } = props
  const [creditScore, setCreditScore] = useState(58);
  const [selectedValue, setSelectedValue] = useState("abc");

  return (
    <>
      <View style={styles.content}>
      <KeyboardAvoidingView keyboardVerticalOffset={110} style={{ flexDirection: 'column', justifyContent: 'center',}} behavior="position" enabled>

        <ScrollView
        showsVerticalScrollIndicator={false}
        >
        <View style={styles.V_phoneNum}>
          <Text style={styles.phoneNum}>{phoneNumber}</Text>
        </View>

        <Line></Line>

        <View style={styles.V_creditScore}>
          <Text style={styles.T_creditScoreHeader}>{i18n.t('home.firstSubHeader')}</Text>
          <RNSpeedometer value={creditScore} size={200}/>
          <Text style={styles.T_creditScoreNote}>{i18n.t('home.suggestionContent.middle')}</Text>
        </View>

        <Line></Line>

        <View style={styles.V_loanDetail}>
          <Text style={styles.T_loanDetailHeader}>{i18n.t('home.secondSubHeader')}</Text>
          <Text style={styles.T_loanDetailResult}>Content goes here</Text>

          <TextInput
            style={styles.loanType}
            placeholder={i18n.t('home.loanOptionsInput')}
          />

          <TextInput
            style={styles.loanAmount}
            placeholder={i18n.t('home.loanAmountInput')}
          />


          <TouchableOpacity
            style={styles.buttonNext}
          >
            <Text style={styles.buttonText}>{i18n.t('home.submitBtn')}</Text>
          </TouchableOpacity>

        </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  line: {
    height: 25,
    width: 100 + '%',
    backgroundColor: '#e3d3d3'
  },

  container: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    height: 100,
    justifyContent: 'flex-end'
  },
  headerText: {
    paddingBottom: 20,
    fontSize: 28
  },
  content: {
    borderRightWidth: 2,
    borderLeftWidth: 2,
    width: SCREEN_WIDTH /10 * 9.4,
    flexDirection: 'column',
    alignContent: 'center'
  },
  footer: {
    flex: 0.08,
  },
  //Content View
  V_phoneNum: {
    height: 60,
    width: 100 + '%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  phoneNum: {
    fontSize: 30
  },
  ////////
  V_creditScore: {
    width: 100 + '%',
    height: 320,
    justifyContent: 'space-between',
  },
  T_creditScoreHeader: {
    fontSize: 22,
    padding: 10
  },
  Graph_CreditScore: {
    alignSelf: 'center'
  },
  T_creditScoreNote: {
    paddingTop: 60,
    paddingBottom: 15
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
  },
  T_loanDetailHeader: {
    padding: 10,
    fontSize: 22
  },
  T_loanDetailResult:{

  },

  loanType: {
    height: 50,
    marginVertical: 20,
    width: 80 + '%',
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 17,
    alignSelf: 'center'
  },
  loanAmount: {
    height: 50,
    marginVertical: 20,
    width: 80 + '%',
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 17,
    alignSelf: 'center'
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
    borderRadius: 8
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '600'
  }

});