import i18n from '../i18n'
import React from 'react'
<<<<<<< HEAD
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import MaskedView from '@react-native-community/masked-view'
import { Content, Input, Item, Text } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
=======
import { StyleSheet } from 'react-native' 
import { Content, Input, Item, Text, Button, View } from 'native-base'
>>>>>>> 33ff63fa39cde313438dc69409fe5ae45ab9b86e
import * as f from 'formik'
import Colours from '../styles/colours'

interface LoginFormProps {
  name?: string,
}

export default function LoginForm(props: unknown) {
  return (
    <View style={styles.container}>
      <Item rounded style={styles.textboxContainer}>
<<<<<<< HEAD
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
=======
        <Input placeholder={i18n.t('signIn.usernameInput')} />
      </Item>
      <Item rounded style={styles.textboxContainer}>
        <Input placeholder={i18n.t('signIn.passwordInput')} secureTextEntry />
      </Item>
      <Text>{i18n.t('signIn.forgetPassword')}</Text>
      <Button rounded dark style={styles.btnContainer}>
        <Text>{i18n.t('signIn.submitBtn')}</Text>
      </Button>
>>>>>>> 33ff63fa39cde313438dc69409fe5ae45ab9b86e
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
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
=======
    width: 80+'%'
  },
  textboxContainer: {
    marginVertical: 10
  },
  btnContainer: {
    alignSelf: 'center'
  }
>>>>>>> 33ff63fa39cde313438dc69409fe5ae45ab9b86e
})
