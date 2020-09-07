@echo off

set custom_deps = react-native-speedometer 
yarn install react-native-speedometer

cd \node_modules\react-native-speedometer
yarn install 
yarn build