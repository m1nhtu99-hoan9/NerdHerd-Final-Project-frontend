import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { exp } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

import UserCreditInfoCard from '../components/UserCreditInfoCard'

/* @TODOs: 
    - [x] (01/08/2020): Just mock-up
*/

export default function HomeScreen () {

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Search history
          </Text>
        </View>

        <LinearGradient
          colors={['#017DDC', '#00BCA0']}
          style={styles.container}>
          <ScrollView 
            horizontal
            style={{ flex: 0.77 }}
          >

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
  }
});