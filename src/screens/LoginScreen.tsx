import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native'
import { Container, Header, Content, Accordion } from 'native-base'
import LoginForm from '../components/LoginForm'

import LinearContainer from '../components/atomic/LinearContainer'

export default function LoginScreen() {
  return (
    <LinearContainer flexDirection={'column'}>
      <Content contentContainerStyle={styles.contentContainer}>
        <Line />
        <Text style={styles.logo}>Crescorex</Text>
        <Line />
        <LoginForm />
      </Content>
    </LinearContainer>
  )
}

const Line = () => {
  return <View style={styles.whiteLine}></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100
  },
  whiteLine: {
    backgroundColor: 'white',
    height: 6,
    width: 77 + '%',
    borderRadius: 20,
    marginVertical: 10,
  },
  logo: {
    color: 'white',
    fontSize: 40,
  },
  inputUsername: {
    textAlign: 'center',
    width: 70 + '%',
    color: 'white',
    fontSize: 15,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#e3e3e3',
    borderRadius: 18,
    marginTop: 70,
  },
  inputPassword: {
    textAlign: 'center',
    width: 70 + '%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#e3e3e3',
    borderRadius: 18,
    marginTop: 15,
  },
  forgotText: {
    color: 'white',
    marginTop: 10,
  },
  buttonLogin: {
    width: 70 + '%',
    paddingVertical: 14,
    paddingHorizontal: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: 40,
  },
  loginText: {
    alignSelf: 'center',
  },
})