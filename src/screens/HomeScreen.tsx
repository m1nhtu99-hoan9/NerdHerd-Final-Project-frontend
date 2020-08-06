import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native'
import { exp } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

import UserCreditInfoCard from '../components/UserCreditInfoCard'

/* @TODOs: 
    - [x] (01/08/2020): Just mock-up
*/
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#017DDC', '#00BCA0']} style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.userInfoCardContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Search history</Text>
            </View>

            <ScrollView horizontal style={{ flex: 0.85, borderRadius: 15 }}>
              <UserCreditInfoCard phoneNumber="0967162652" />

              <UserCreditInfoCard phoneNumber="0904586221" />
            </ScrollView>
          </View>
        </ScrollView>

        <View style={styles.footer}></View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flex: 0.15,
    justifyContent: 'flex-end',
  },
  headerText: {
    paddingBottom: 20,
    fontSize: 28,
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
    width: (SCREEN_WIDTH / 10) * 9.4,
    height: (SCREEN_HEIGHT / 10) * 8.5,
    alignSelf: 'center',
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
    marginTop: 10 + '%',
  },
})
