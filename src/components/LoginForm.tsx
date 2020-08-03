import React from 'react'
import { Content, Input, Item } from 'native-base'
import * as f from 'formik'

export default function LoginForm (props: unknown) {
  return (
    <Content>
      <Item rounded>
        <Input placeholder='Ten Dang Nhap'/>
      </Item>
    </Content>
  )
}