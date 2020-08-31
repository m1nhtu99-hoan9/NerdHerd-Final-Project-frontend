import React, {useLayoutEffect} from 'react'
import { AppLoading } from 'expo'
import { StyleSheet } from 'react-native'
import SyncStorage from 'sync-storage'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './src/navigation/stackNavigator'
import { useFonts } from 'expo-font'

import { useImageAsset } from './src/utils/useImageAsset'
import { FontList, AssetList } from './src/styles'

export default function App() {
  /* asynchronously load font & image assets */
  const [fontsLoaded, fontsError] = useFonts(FontList)
  const [imagesLoaded, imagesError] = useImageAsset(AssetList)

  /* inititate SyncStorage when the app boots up */
  useLayoutEffect(() => {
    (async () => {
      const data = await SyncStorage.init()
      // confirm this is first launch
      if (typeof SyncStorage.get('isFirstLaunch') === 'undefined') {
        SyncStorage.set('isFirstLaunch', true)
      }
      console.log('SyncStorage is available', SyncStorage.getAllKeys())
    })()
  }, [])

  /* if fonts & prefetched images not finished loading yet, 
     display the loading indicator 
  */
  return (!fontsLoaded || !imagesLoaded) ? (
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
