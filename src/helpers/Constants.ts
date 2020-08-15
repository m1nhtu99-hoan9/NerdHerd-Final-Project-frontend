/* Reference: 
  `https://github.com/wix/react-native-ui-lib/blob/master/src/helpers/Constants.ts`
   This module is written based on the assumption that the app  
   only supports horizontal mode of orientation
*/

import { Dimensions, Platform, StatusBar } from 'react-native'
import * as Device from 'expo-device'

const isIPad = () => Device.osName === 'iPadOS'
const window = Dimensions.get('window')

const SCREEN_WIDTH = window.width
const SCREEN_HEIGHT = window.height

/** @description For iOS devices, if this device is an iPhone having _bunny ears_,
 * evaluates to 44, else evaluates to 20. For Android devices, evaluation is computed 
 * using React Native's `StatusBar` module.
 * */
const STATUS_BAR_HEIGHT: number = Platform.select({
  ios: SCREEN_WIDTH > 736 && !isIPad && !Platform.isTV ? 44 : 20,
  android: StatusBar.currentHeight,
  default: 0,
})

/* reference: https://stackoverflow.com/questions/33628677/react-native-responsive-font-size */

// base on iPhoneX screen
const BASE_WIDTH = 1125
const BASE_HEIGHT = 2436

const normaliseSizeVertical = (n: number) => (SCREEN_WIDTH / BASE_WIDTH) * n
const normaliseSizeHorizontal = (n: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * n
/**@TODO Calculate the scaled value adjusting to different display dimensions*/
const normalise = (n: number, factor: number = 0.168) =>
  n + (normaliseSizeVertical(n) - n) * factor

export {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  STATUS_BAR_HEIGHT,
  normalise,
  normaliseSizeVertical,
  normaliseSizeHorizontal,
}
