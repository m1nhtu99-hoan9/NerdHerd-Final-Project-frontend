import React from 'react'
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

type LinearContainerProps = {
  flexDirection: 'row' | 'column',
  children: React.ReactNode
}

export default function GradientContainer(props: LinearContainerProps) {
  const { flexDirection, children } = props

  return (
    <LinearGradient
      colors={['#017DDC', '#00BCA0']}
      style={{
        flex: 1,
        flexDirection,
        justifyContent: 'center',
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.75 }}
    >
      {children}
    </LinearGradient>
  )
}
