import i18n from '../i18n'
import React from 'react'
import { Content, Input, Item, Text } from 'native-base'
import * as f from 'formik'

export default function LoginForm(props: unknown) {
  return (
    <Content>
      <Item rounded>
        <Input placeholder={i18n.t('signIn.usernameInput')} />
      </Item>
      <Item rounded>
        <Input placeholder={i18n.t('signIn.passwordInput')} />
      </Item>
      <Text>{i18n.t('signIn.forgetPassword')}</Text>
    </Content>
  )
}


