import React from 'react'
import { TextStyle } from 'react-native'
import { Text } from 'native-base'
import { Colours, Fonts } from '../../styles'
import { normalise } from '../../helpers'

export default function StyledText({
  children,
  style,
  fontWeight,
}: {
  children: string
  style?: TextStyle
  fontWeight?: 'bold' | 'regular' | 'light'
}) {
  const getFontFamily = () => {
    switch (fontWeight) {
      case 'bold':
        return Fonts.PrimaryBold
      case 'light':
        return Fonts.PrimaryLight
      case 'regular':
        return Fonts.PrimaryRegular
      default:
        return Fonts.PrimaryRegular
    }
  }
  return (
    <Text
      style={[
        {
          fontFamily: getFontFamily(),
        },
        {
          fontSize: normalise(16),
          color: Colours.White,
        },
        style,
      ]}
    >
      {children}
    </Text>
  )
}
