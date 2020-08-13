import React from 'react'
import { StyleSheet, ScrollView, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

//Import normalise
import { normalise } from '../../src/helpers/Constants'

export default function ChangePasswordScreen () {
  return (
    <View>
      <TextInput
        secureTextEntry
        placeholderTextColor={'#BDBDBD'}
        maxLength={22}
        placeholder={'Nhap mat khau cu'}
        style={styles.input}
      />

      <TextInput
        secureTextEntry
        placeholderTextColor={'#BDBDBD'}
        maxLength={22}
        placeholder={'Nhap mat khau moi'}
        style={styles.input}
      />

      <TextInput
        secureTextEntry
        placeholderTextColor={'#BDBDBD'}
        maxLength={22}
        placeholder={'Xac nhan mat khau moi'}
        style={styles.input}
      />

      <Line></Line>

      <TouchableOpacity style={styles.confirmButton}>
        <Text>Xac nhan</Text>
      </TouchableOpacity>
    </View>
  )
}

const Line = () => {
  return <View style={styles.line}></View>
}

const styles = StyleSheet.create({
  line: {
    height: 3,
    borderRadius: 100,
    width: 65 + '%', //////////////////////////////////
    alignSelf: 'center',
    backgroundColor: '#E6E6E6',
    marginVertical: 40,
  },
  input: {
    width: 80 + '%', //////////////////////////////////
    height: 55,
    fontSize: normalise(16),
    borderWidth: 2,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 35,
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  confirmButton: {
    borderWidth: 2,
    width: 80 + '%', ///////////////////////////////////
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 7,
    marginTop: 20,
  },
})
