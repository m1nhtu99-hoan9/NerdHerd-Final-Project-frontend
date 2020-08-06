import i18n from '../i18n'
import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import MaskedView from '@react-native-community/masked-view'
import { Content, Input, Item, Text } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import * as f from 'formik'
import Colours from '../styles/colours'

interface LoginFormProps {
  name?: string,
}

export default function LoginForm(props: unknown) {
  return (
    <View style={styles.container}>
      <Item rounded style={styles.textboxContainer}>
        <Input
          selectionColor={Colours.White}
          style={styles.placeholderTxt}
          placeholder={i18n.t('signIn.usernameInput')}
          placeholderTextColor={Colours.White}
        />
      </Item>
      <Item rounded style={styles.textboxContainer}>
        <Input
          selectionColor={Colours.White}
          style={styles.placeholderTxt}
          placeholder={i18n.t('signIn.passwordInput')}
          placeholderTextColor={Colours.White}
          secureTextEntry
        />
      </Item>
      <Text>{i18n.t('signIn.forgetPassword')}</Text>
      <LinearGradient colors={[Colours.Purple1, Colours.Sapphire]}>
        <MaskedView
          style={{ flex: 1, flexDirection: 'row', height: '100%' }}
          maskElement={
            <View
              style={{
                // Transparent background because mask is based off alpha channel.
                backgroundColor: 'transparent',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 60,
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  Basic Mask
                </Text>
              </TouchableOpacity>
            </View>
          }
        >
          {/* Shows behind the mask, you can put anything here, such as an image */}
        </MaskedView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    flexDirection: 'column',
    width: 80 + '%',
  },
  textboxContainer: {
    marginVertical: 10,
    borderColor: Colours.White,
  },
  btnContainer: {
    backgroundColor: 'transparent',
    borderRadius: 15,
    height: 32 + '%',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 100 + '%',
  },
  buttonTxt: {
    color: 'black',
    fontSize: 60,
    textAlign: 'center',
  },
  placeholderTxt: {
    backgroundColor: 'transparent',
    borderRadius: 99,
    borderWidth: 2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderColor: Colours.White,
    elevation: 5,
  },
})
