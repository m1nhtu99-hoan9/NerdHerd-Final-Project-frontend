import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Container, Header, Content, Accordion } from 'native-base'
import 'react-native-gesture-handler';

export default function LoginScreen () {
  return (
    <LinearGradient colors={['#017DDC', '#00BCA0']} style={styles.container}>
      <Line />
      <Text style={styles.logo}>Crescorex</Text>
      <Line />
      <TextInput
        maxLength={20}
        style={styles.inputUsername}
        placeholder="Username"
        placeholderTextColor={'#bdbdbd'}
      />

      <TextInput
        maxLength={22}
        style={styles.inputPassword}
        placeholder="Password"
        placeholderTextColor={'#bdbdbd'}
        secureTextEntry
      />

      <Text style={styles.forgotText}>
        Forgot Password?
      </Text>

      <TouchableHighlight style={styles.buttonLogin}>
        <Text style={styles.loginText}>Log in</Text>
      </TouchableHighlight>
    </LinearGradient>
  )
}

const Line = () => {
  return <View style={styles.whiteLine}></View>
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
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
