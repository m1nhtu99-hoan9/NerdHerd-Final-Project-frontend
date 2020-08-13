import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { BottomTabParamList } from '../../src/@types/navigation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

import { HomeScreen, InformationScreen, SearchScreen } from '../screens/index'
import { View, Animated } from 'react-native'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'

const Tab = createBottomTabNavigator<BottomTabParamList>()

/**@reference
 * https://reactnavigation.org/docs/bottom-tab-navigator/#tabbar
 * https://github.com/react-navigation/react-navigation/blob/main/packages/bottom-tabs/src/views/BottomTabBar.tsxs
 */

const BottomTabNavigator = () => {
  const [tabbarColor, setTabbarColor] = useState(['transparent', 'transparent'])
  const [tabbarColorDefault, setTabbarColorDefault] = useState([
    'transparent',
    'transparent',
  ])

  const value = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0]

  const moveTab = (x: number, y: number) => {
    Animated.timing(value, {
      toValue: { x: x, y: y },
      duration: 300,
      useNativeDriver: false,
    }).start()
  }

  return (
    <Tab.Navigator
      initialRouteName="Index"
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Index"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View>
              <Animated.View style={value.getLayout()}>
                <LinearGradient
                  colors={['#017DDC', '#00BCA0']}
                  style={styles.tabBarIconContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                />
              </Animated.View>
              <TouchableOpacity onPress={() => moveTab(0,0)}>
              <AntDesign name="home" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        listeners={() => ({
          tabPress: (e) => {
            var tabColor = tabbarColor
            setTabbarColor(['#017DDC', '#00BCA0'])
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TouchableOpacity onPress={() => moveTab(123, 0)}>
            <AntDesign
              
              name="search1"
              size={24}
              color="black"
            />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={InformationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TouchableOpacity onPress={() => moveTab(248, 0)}>
            <FontAwesome5
              
              name="user"
              size={24}
              color="black"
            />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarIconContainer: {
    width: 330 + '%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -35,
    alignSelf: 'center',
    borderRadius: 22,
    zIndex: -2
  },
})

export default BottomTabNavigator
