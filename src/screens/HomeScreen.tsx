const { exp } = require("react-native-reanimated")
import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import UserCreditInfoCard from '../components/UserCreditInfoCard'

/* @TODOs: 
    - [x] (01/08/2020): Just mock-up
*/

export default function HomeScreen () {

  return (
    <View style={styles.container}>
      <ScrollView style={{}}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Search history</Text>
        </View>

        <LinearGradient
          colors={['#017DDC', '#00BCA0']}
          style={styles.container}>
          <ScrollView horizontal
            style={{ flex: 0.77 }}>

            <UserCreditInfoCard
              phoneNumber='0967162652'
            />

            <UserCreditInfoCard
              phoneNumber='0904586221'
            />

          </ScrollView>
        </LinearGradient>
      </ScrollView>

      <View style={styles.footer}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  line: {
    height: 18,
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
  //Content View
  V_phoneNum: {
    height: 80,
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
    height: 270,
    justifyContent: 'space-between'
  },
  T_creditScoreHeader: {
    fontSize: 22,
    padding: 10
  },
  Graph_CreditScore: {
    alignSelf: 'center'
  },
  T_creditScoreNote: {
    padding: 10
  },

  /////
  V_creditScoreHistory: {
    width: 100 + '%',
    height: 400,
    justifyContent: 'space-between'
  },
  T_creditScoreHistoryHeader: {
    fontSize: 22,
    padding: 10
  },
  Graph_creditScoreHistory: {
    alignSelf: 'center'
  },
  T_creditScoreHistoryNote: {
    alignSelf: "center",
    paddingBottom: 10
  },


  ///////
  V_loanDetail: {

    height: 480,
    width: 100 + '%',
  },
  T_loanDetailHeader: {
    padding: 10,
    fontSize: 22
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
    marginTop: 70,
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