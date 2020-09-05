import React, { useState } from 'react'
import { View } from 'react-native'
import { normalise } from '../../../src/helpers'
import { AntDesign } from '@expo/vector-icons'

const TextInputIcon = () => {
  return (
    <View
      style={{
        position: 'absolute',
        right: 0,
        zIndex: -1,
        width: 50,
        height: 48,
        borderLeftColor: 'grey',
        borderTopRightRadius: 35,
        borderBottomRightRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AntDesign name="downcircle" size={normalise(22)} color="#c9c7c3" />
    </View>
  )
}

export default TextInputIcon
