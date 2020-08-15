import React from 'react'
import { AppLoading } from 'expo'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { BottomTabNavigator, StackNavigator } from './src/navigation/index'
import { useFonts } from 'expo-font'

import { useImageAsset } from './src/utils/useImageAsset'
import { FontList, AssetList } from './src/styles/index'

export default function App() {
  /* asynchronously load font & image assets */
  const [fontsLoaded, fontsError] = useFonts(FontList)
  const [imagesLoaded, imagesError] = useImageAsset(AssetList)

  /* if fonts & prefetched images not finished loading yet, 
     display the loading indicator 
  */
  return !(fontsLoaded && imagesLoaded) ? (
    <AppLoading />
  ) : (
    <NavigationContainer>
      {/* current initial route: `Login`, 
          currently not finished yet;
          build status not tested yet */}
      <StackNavigator />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
