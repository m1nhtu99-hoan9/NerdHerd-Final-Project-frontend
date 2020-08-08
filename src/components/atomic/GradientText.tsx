import React from 'react'
import { Text, TextProperties } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-community/masked-view'

import { Colours } from '../../styles/index'

export default function GradientText(
  props: TextProperties & { children: string },
) {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={[Colours.Purple1, Colours.RedVenetian]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  )
}
