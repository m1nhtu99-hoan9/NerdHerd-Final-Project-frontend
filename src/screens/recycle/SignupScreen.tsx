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


export default function SignupScreen({}) {
  return (
    <GradientContainer flexDirection={'column'}>
      <Line />
      <Text style={styles.logo}>Crescorex</Text>
      <Line />

      <Text style={{alignSelf: 'flex-start'}}>{"<"} Quay lai</Text>

      <View>
      <TextInput
        maxLength={20}
        style={styles.inputUsername}
        placeholder="Ma ban quyen"
        placeholderTextColor={'#bdbdbd'}
      />

      <TextInput
        maxLength={20}
        style={styles.inputUsername}
        placeholder="Email"
        placeholderTextColor={'#bdbdbd'}
      />

      <TextInput
        maxLength={20}
        style={styles.inputUsername}
        placeholder="So dien thoai"
        placeholderTextColor={'#bdbdbd'}
      />

      <TextInput
        maxLength={22}
        style={styles.inputPassword}
        placeholder="Mat khau"
        placeholderTextColor={'#bdbdbd'}
        secureTextEntry
      />

      <TextInput
        maxLength={22}
        style={styles.inputPassword}
        placeholder="Xac nhan mat khau"
        placeholderTextColor={'#bdbdbd'}
        secureTextEntry
      />

      <TouchableHighlight style={styles.buttonLogin}>
        <Text style={styles.loginText}>Log in</Text>
      </TouchableHighlight>
    </View>
    
    </GradientContainer>
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
    borderRadius: 30,
    marginTop: 15,
  },
  inputPassword: {
    textAlign: 'center',
    width: 70 + '%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#e3e3e3',
    borderRadius: 30,
    marginTop: 10,
  },
  forgotText: {
    color: 'white',
    marginTop: 15,
  },
  buttonLogin: {
    width: 70 + '%',
    paddingVertical: 14,
    paddingHorizontal: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: 30,
  },
  loginText: {
    alignSelf: 'center',
  },
})
