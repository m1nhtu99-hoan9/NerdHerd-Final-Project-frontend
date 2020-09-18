export default {
  name: 'NerdHerd-Final-Project-frontend',
  slug: 'NerdHerd-Final-Project-frontend',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: [
    '**/*',
    'node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/*',
  ],
  android: {
    package: "com.nerdherd.crescorex"
  },
  ios: {
    supportsTablet: true,
  },
  web: {
    favicon: './assets/favicon.png',
  }
}
