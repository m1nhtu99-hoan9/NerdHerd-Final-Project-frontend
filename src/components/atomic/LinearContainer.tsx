import React from 'react'
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

type LinearContainerProps = {
  flexDirection: 'row' | 'column',
  children: React.ReactNode
}

export default function LinearContainer(props: LinearContainerProps) {
  const { flexDirection, children } = props

  return (
    <LinearGradient
      colors={['#017DDC', '#00BCA0']}
      style={{
        flex: 1,
        flexDirection,
        justifyContent: 'center',
      }}
    >
      {children}
    </LinearGradient>
  )
}
