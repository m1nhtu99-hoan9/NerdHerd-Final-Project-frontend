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
import { normaliseH, normaliseV } from '../helpers'

import StyledText from '../../src/components/atomic/StyledText'

//Get devices's dimension
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function SeacrhScreen() {
  const navigation = useNavigation<SearchScreenNavigationProps>()

  return (
    <GradientContainer flexDirection={'column'}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <StyledText fontWeight='bold' style={styles.headerText}>{i18n.t('search._nav')}</StyledText>
          </View>
          <View style={styles.searchField}>
            <TextInput
              style={styles.inputField}
              placeholder={i18n.t('search.phoneNumInput')}
            />

            <TextInput
              style={styles.inputField}
              placeholder={i18n.t('search.otpCodeInput')}
            />

            <TouchableOpacity
              style={styles.searchButton}
              onPress={() =>
                navigation.navigate('SearchResult', { phone: undefined })
              }
            >
              <StyledText fontWeight='bold' style={styles.searchText}>{i18n.t('search.submitBtn')}</StyledText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GradientContainer>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: 100 + '%',
    paddingTop: normaliseV(140),
  },
  content: {
    backgroundColor: 'white',
    width: 94 + '%',
    height: 50 + '%',
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
    paddingHorizontal: normaliseH(40),
  },
  header: {
    flex: 0.17,
    justifyContent: 'flex-end',
    paddingBottom: normalise(10),
  },
  searchField: {
    flex: 0.83,
  },
  headerText: {
    fontSize: normalise(29),
    paddingTop: normaliseV(40),
    color: 'black',
  },
  inputField: {
    fontFamily: "ComfortaaRegular",                 // Test
    lineHeight: 17,
    textAlign: 'center',
    height: normalise(50),
    marginVertical: normalise(15),
    width: 100 + '%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingHorizontal: normaliseV(20),
    alignSelf: 'center',
  },
  searchButton: {
    marginTop: normaliseV(70),
    borderWidth: 2,
    width: 40 + '%',
    height: normaliseV(140),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 7,
  },
  searchText: {
    fontSize: normalise(13.6),
    color: 'black'
  }
})
