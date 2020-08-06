import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export const Logo = () => {
  return (
    <View>
      <Line />
      <Text style={styles.logo}>Crescorex</Text>
      <Line />
    </View>
  )
}

const Line = () => {
  return <View style={styles.whiteLine}></View>
}

const styles = StyleSheet.create({
    whiteLine: {
        backgroundColor: 'white',
        height: 6,
        width: 77 + '%',
        borderRadius: 20,
        marginVertical: 10,
      },
      logo: {
        color: 'white',
        fontSize: 40,
      },
})
