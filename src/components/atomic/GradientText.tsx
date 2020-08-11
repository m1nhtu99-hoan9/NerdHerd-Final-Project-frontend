import React from 'react'
import { Text, TextProperties } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-community/masked-view'

import { Colours } from '../../styles/index'

type GradientTextProps = TextProperties & {
  children: string
  constrast?: boolean
}

const colourSets = [
  ['#017DDC', '#00BCA0'],
  ['#BC001C', '#DC6001']
]

export default function GradientText(props: GradientTextProps) {
  const { constrast } = props

  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={colourSets[constrast ? 1 : 0]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  )
}
