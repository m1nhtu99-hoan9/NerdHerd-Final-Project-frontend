import i18n from '../../i18n'
import React from 'react'
import { StyleSheet, TextInputProps as RNTextInputProps } from 'react-native'
import { Input, Item, Text, View } from 'native-base'
import { omit } from 'ramda'

import { Colours } from '../../styles/index'

type TextInputProps = RNTextInputProps & {
  success?: boolean
  error?: boolean
  disabled?: boolean
  i18nPlaceholderContent: string
}

/**
 * @description Customised NativeBase text input component
 * @extends ReactNative.TextInputProps
 * @props
 *    - `success`: to show that textbox is filled with invalid data
 *    - `error`: to show that textbox is filled with invalid data
 *    - `disabled`: to restrict inputting data into textbox
 *    - `i18nPlaceholderContent`: message for i18n to translate and display as 
 *        this input field's placeholder
 *    - & props inherited from ReactNative's `Input`
 */
export default function TextInput(props: TextInputProps) {
  /* props === { ...itemProps, i18nPlaceholderContent, ...inputLiteralProps } */
  
  const { success, error, disabled, i18nPlaceholderContent } = props
  const itemProps = { success, error, disabled }
  const inputLiteralProps = omit([
    ...Object.keys(itemProps),
    'i18nPlaceholderContent',
  ])(props)
  
  return (
    <Item rounded style={styles.textboxContainer} {...itemProps}>
      <Input
        selectionColor={Colours.White}
        style={styles.placeholderTxt}
        placeholder={i18n.t(i18nPlaceholderContent)}
        placeholderTextColor={Colours.White}
        {...inputLiteralProps}
      />
    </Item>
  )
}

const styles = StyleSheet.create({
  textboxContainer: {
    flex: 3,
    marginVertical: 10,
    borderColor: Colours.White,
    shadowOffset: {
      width: 0,
      height: 0.25,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1,
    elevation: 2,
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
  },
})
