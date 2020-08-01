module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        // reference: https://callstack.github.io/react-native-paper/getting-started.html
        plugins: ['react-native-paper/babel']
      }
    }
  };
};
