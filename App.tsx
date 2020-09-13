import React, { useLayoutEffect, useContext } from 'react'
import { AppLoading } from 'expo'
import { StyleSheet } from 'react-native'
import SyncStorage from 'sync-storage'

import { useFonts } from 'expo-font'
import { useImageAsset } from './src/utils/useImageAsset'
import { FontList, AssetList } from './src/styles'

import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './src/navigation/stackNavigator'

import { interpret as interpretStateMachine } from 'xstate'
import { useService } from '@xstate/react'
import { AppMachine } from './src/machines'
import { InterpreterAppMachine, AppMachineEvent } from './src/@types/machines'
import { AppMachineContext } from './src/contexts'

console.disableYellowBox = true

/* initialisation of a running service instance of app machine blueprint is a side effect
   independent from initialisation of React app
*/
const AppService = interpretStateMachine(AppMachine)
AppService.start()
/* for DEBUGGING */
AppService.onTransition((state) =>
  console.log('CURRENT STATE: ', state),
).onEvent((event) => console.log('EVENT: ', event))

export default function App() {
  const [appMState, appMSend] = useService(AppService)

  /* asynchronously load font & image assets */
  const [fontsLoaded, fontsError] = useFonts(FontList)
  const [imagesLoaded, imagesError] = useImageAsset(AssetList)

  /* initialise SyncStorage when the app boots up */
  useLayoutEffect(() => {
    /* Asynchronous IIFE */
    ;(async () => {
      const data = await SyncStorage.init()
      // !!side effect!! initialise first launch
      if (typeof SyncStorage.get('isFirstLaunch') === 'undefined') {
        SyncStorage.set('isFirstLaunch', true)
      }

      // for DEBUGGING
      console.log('SyncStorage is available', SyncStorage.getAllKeys())
    })()
  }, [])

  /* if fonts & prefetched images not finished loading yet, 
     display the loading indicator 
  */
  return !fontsLoaded || !imagesLoaded ? (
    <AppLoading />
  ) : (
    <NavigationContainer>
      {/* to persist AppService hooks throughtout the app life cycle */}
      <AppMachineContext.Provider value={[appMState, appMSend]}>
        <StackNavigator />
      </AppMachineContext.Provider>
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
