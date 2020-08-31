import i18n from '../i18n'
import React from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { SearchScreenNavigationProps } from '../@types/navigation'

import GradientContainer from '../components/atomic/GradientContainer'
import { HomeScreenNavigationProps } from '../@types/navigation'

//Import normalise
import { normalise } from '../../src/helpers/Constants'

//Get devices's dimension
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function SeacrhScreen() {
  const navigation = useNavigation<SearchScreenNavigationProps>()

  return (
    <GradientContainer flexDirection={'column'}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{i18n.t('search._nav')}</Text>
        </View>
        <View style={styles.searchField}>
          <TextInput style={styles.inputField} placeholder={i18n.t('search.phoneNumInput')} />

          <TextInput style={styles.inputField} placeholder={i18n.t('search.otpCodeInput')} />

          <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate("SearchResult", {phone: undefined})}>
            <Text>{i18n.t('search.submitBtn')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GradientContainer>
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
    paddingBottom: normalise(10),
  },
  searchField: {
    flex: 0.85,
  },
  headerText: {
    fontSize: normalise(28),
    fontWeight: '600',
  },
  inputField: {
    textAlign: 'center',
    height: 50,
    marginVertical: normalise(15),
    width: 80 + '%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  searchButton: {
    marginTop: normalise(20),
    borderWidth: 2,
    width: 45 + '%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 7,
  },
})
