import React from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import LinearContainer from '../components/atomic/LinearContainer'
import { HomeScreenNavigationProps } from '../@types/navigation'

//Get devices's dimension
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function SeacrhScreen() {
  return (
    <LinearContainer flexDirection={'column'}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Tra cuu</Text>
        </View>
        <View style={styles.searchField}>
          <TextInput style={styles.inputField} placeholder="So dien thoai" />

          <TextInput style={styles.inputField} placeholder="Ma OTP" />

          <TouchableOpacity style={styles.searchButton}>
            <Text>Tra cuu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearContainer>
  )
}

const Line = () => {
  return <View style={styles.line}></View>
}

const styles = StyleSheet.create({
  line: {
    height: 3,
    borderRadius: 100,
    width: 65 + '%',
    alignSelf: 'center',
    backgroundColor: '#e6e6e6',
  },
  container: {
    flex: 1,
    width: 100 + '%',
  },
  content: {
    backgroundColor: 'white',
    width: (SCREEN_WIDTH / 10) * 9.4,
    height: 60 + '%',
    alignSelf: 'center',
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
  header: {
    flex: 0.15,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  searchField: {
    flex: 0.85,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '600',
  },
  inputField: {
    textAlign: 'center',
    height: 50,
    marginVertical: 15,
    width: 80 + '%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 17,
    alignSelf: 'center',
  },
  searchButton: {
    marginTop: 20,
    borderWidth: 2,
    width: 45 + '%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 7,
  },
})
