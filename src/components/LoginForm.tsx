import i18n from '../i18n'
import React from 'react'
import { StyleSheet } from 'react-native' 
import { Content, Input, Item, Text, Button, View } from 'native-base'
import * as f from 'formik'

interface LoginFormProps {
  name?: string,
}

export default function LoginForm(props: unknown) {
  return (
    <View style={styles.container}>
      <Item rounded style={styles.textboxContainer}>
        <Input placeholder={i18n.t('signIn.usernameInput')} />
      </Item>
      <Item rounded style={styles.textboxContainer}>
        <Input placeholder={i18n.t('signIn.passwordInput')} secureTextEntry />
      </Item>
      <Text>{i18n.t('signIn.forgetPassword')}</Text>
      <Button rounded dark style={styles.btnContainer}>
        <Text>{i18n.t('signIn.submitBtn')}</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 80+'%'
  },
  textboxContainer: {
    marginVertical: 10
  },
  btnContainer: {
    alignSelf: 'center'
  }
})
