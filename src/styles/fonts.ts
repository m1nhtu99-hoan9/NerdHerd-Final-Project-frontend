type FontFromRequire = number

type FontAsset = {
  [key: string]: FontFromRequire
}

/**
 * @description These fonts are asynchorously loaded when app start loading
 * @see App.tsx
 */
export enum Fonts {
  PrimaryBold = 'ComfortaaBold',
  PrimaryRegular = 'ComfortaaRegular',
  PrimaryLight = 'ComfortaaLight',
}

export const FontList: Readonly<FontAsset> = {
  ComfortaaRegular: require('../../assets/fonts/Comfortaa-Regular.ttf'),
  ComfortaaBold: require('../../assets/fonts/Comfortaa-Bold.ttf'),
}
