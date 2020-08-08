import React from 'react'
import { View } from 'react-native'

export default function Line() {
  return (
    <View
      style={{
        height: 3,
        borderRadius: 100,
        width: 65 + '%',
        alignSelf: 'center',
        backgroundColor: '#e6e6e6',
        marginTop: 20,
      }}
    />
  )
}
