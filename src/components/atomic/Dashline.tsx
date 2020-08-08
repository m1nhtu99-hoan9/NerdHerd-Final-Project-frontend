import React from 'react'
import { View } from 'react-native'

type DashlineProps = {
  top?: boolean
  bottom?: boolean
}

export default function Dashline(props: DashlineProps) {
  const { top, bottom } = props

  return (
    <View
      style={[
        {
          height: 6,
          width: 77 + '%',
          borderRadius: 20,
          marginVertical: 10,
          backgroundColor: 'white',
        },
        top && { marginTop: 100 },
        bottom && { marginBottom: 75 },
      ]}
    />
  )
}
