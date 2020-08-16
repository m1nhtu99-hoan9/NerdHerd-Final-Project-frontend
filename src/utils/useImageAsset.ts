import { useState, useEffect } from 'react'
import { Image } from 'react-native'
import { SplashScreen } from 'expo'
import { Asset } from 'expo-asset'

type ImageURI = string
type ImageFromRequire = number
export type ImageAsset = ImageURI | ImageFromRequire

const cacheImages = (images: Array<ImageAsset>) => {
  return Promise.all(
    images.map(
      (img: ImageAsset): Promise<void> => {
        return typeof img === 'string'
          ? Image.prefetch(img)
          : Asset.fromModule(img).downloadAsync()
      },
    ),
  )
}

/**A custom hook for loading image asset inspired by `expo-font`'s `useFonts`
 * @arg
 *  array of image asset, in which elements can be either a URI string or a `require` expression
 * @returns
 *  tuple of 2 elements: the first one is of type `boolean`, the second one is the returned error
 *  in case the promise rejected
 * @references
 *  https://github.com/expo/expo/blob/master/packages/expo-font/src/FontHooks.ts
 *  https://github.com/elkevinwolf/use-expo-asset-loader/blob/master/src/use-expo-asset-loader.ts
 */
export function useImageAsset(
  images: Readonly<ImageAsset[]>,
): [boolean, Error | null] {
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [imagesError, setImagesError] = useState<Error | null>(null)

  useEffect(() => {
    SplashScreen.preventAutoHide()

    cacheImages(images)
      .then(() => setImagesLoaded(true))
      .catch(setImagesError)
  }, [])

  return [imagesLoaded, imagesError]
}

/**A wrapper around `Asset.fromModule` 
 * @see https://docs.expo.io/versions/latest/sdk/asset/#assetfrommodulemodule
 * @arg a `require` expression querying the desired asset; please note that the path is resolved
 * relative to the source file in which this function is called
 * @return an `Asset` instance for the asset
*/
export const getCachedUri = (image: ImageFromRequire): string => Asset.fromModule(image).uri