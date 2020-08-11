import React from 'react'
import { View } from 'react-native'

type DashlineProps = {
  top?: boolean
  bottom?: boolean
  stretch?: boolean
  flex?: number
}

export default function Dashline(props: DashlineProps) {
  const { top, bottom, stretch, flex } = props

  return (
    <View
      style={[
        {
          height: stretch ? 8 : 6,
          width: (stretch ? 98 : 77) + '%',
          borderRadius: 20,
          marginVertical: 10,
          backgroundColor: 'white',
        },
        top && { marginTop: 100 },
        bottom && { marginBottom: 75 },
        stretch && { marginBottom: 10 },
        { /* @ts-ignore */ flex },
      ]}
    />
  )
}
