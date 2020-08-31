/* Reference: 
  `https://github.com/wix/react-native-ui-lib/blob/master/src/helpers/Constants.ts`
   This module is written based on the assumption that the app  
   only supports horizontal mode of orientation
*/

import {
  Dimensions,
  Platform,
  StatusBar,
  ImageSourcePropType,
} from 'react-native'
import * as Device from 'expo-device'
import { Image } from 'react-native'
import { ImageAsset } from '../utils'
import { RFValue } from 'react-native-responsive-fontsize'

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
/**@description Calculate the scaled value adjusting to different display dimensions*/
const normalise = (n: number) => RFValue(n, SCREEN_HEIGHT)

/**@arguments
 *  - `source`: A number (opaque type returned by `require` function) or an React Native's `ImageSource`.
 *  - `percentage`: A float percentage, for examples, `0.45` or `0.98`, etc.
 *  - `byWidth`: if `true`, returned image width will equal screen width times `percentage`; otherwise, 
 *       returned image height will equal screen height times `percentage`
 * @returns
 *    an object having properties of `width` & `height`; ratio of them equals the original ratio
 * @see https://reactnative.dev/docs/image#resolveassetsource
 */
const scaleImageByScreenDimensions = (
  source: ImageAsset,
  percentage: number,
  byWidth: boolean = true,
) => {
  const _imageRefObj = Image.resolveAssetSource(source as ImageSourcePropType)
  const ORIGINAL_HEIGHT = _imageRefObj.height
  const ORIGINAL_WIDTH = _imageRefObj.width

  const SCALED_HEIGHT = SCREEN_HEIGHT * percentage
  const SCALED_WIDTH = SCREEN_WIDTH * percentage
  return byWidth
    ? {
        width: SCALED_WIDTH,
        height: (SCALED_WIDTH / ORIGINAL_WIDTH) * ORIGINAL_HEIGHT,
      }
    : {
        width: (SCALED_HEIGHT / ORIGINAL_HEIGHT) * ORIGINAL_WIDTH,
        height: SCALED_HEIGHT,
      }
}

export {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  STATUS_BAR_HEIGHT,
  normalise,
  scaleImageByScreenDimensions,
  normaliseSizeVertical,
  normaliseSizeHorizontal,
}
