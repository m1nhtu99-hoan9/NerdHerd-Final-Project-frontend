import React, { useState, ReactNode } from 'react'
import { StyleSheet, View, Animated, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

import {
  BottomTabParamList,
  IndexScreenNavigationProp,
  SearchScreenNavigationProp,
  ProfileScreenNavigationProp,
} from '../../src/@types/navigation'

import HomeStackNavigator from '../navigation/homeStackNavigator'
import { HomeScreen, InformationScreen, SearchScreen } from '../screens/index'

import { normalise, normaliseV, normaliseH, SCREEN_WIDTH } from '../helpers'

const Tab = createBottomTabNavigator<BottomTabParamList>()

/**@reference
 * https://reactnavigation.org/docs/bottom-tab-navigator/#tabbar
 * https://github.com/react-navigation/react-navigation/blob/main/packages/bottom-tabs/src/views/BottomTabBar.tsxs
 */

const BottomTabNavigator = () => {
  const indexNav = useNavigation<IndexScreenNavigationProp>()
  const searchNav = useNavigation<SearchScreenNavigationProp>()
  const profileNav = useNavigation<ProfileScreenNavigationProp>()

  /* for transition animation between tab presses */
  const value = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0]

  const moveTab = (x: number, y: number) => {
    Animated.timing(value, {
      toValue: { x, y },
      duration: 300,
      useNativeDriver: false,
    }).start()
  }

  /* Centralised OnPress behaviour factory */
  const _tabOnPressed = (name: 'Profile' | 'Index' | 'Search'): (() => void) => {
    switch (name) {
      case 'Profile':
        return () => {
          moveTab((SCREEN_WIDTH / 10) * 6.67, 0)
          profileNav.navigate('Profile', { userId: '' })
        }
      case 'Index':
        return () => {
          moveTab(0, 0)
          indexNav.navigate('Index', { userId: '' })
        }
      case 'Search': 
        return () => {
          moveTab((SCREEN_WIDTH / 10) * 3.32, 0)
          searchNav.navigate('Search')
        }
    }
  }

  return (
    <Tab.Navigator
      initialRouteName="Index"
      tabBarOptions={{
        showLabel: false,
        tabStyle: {
          marginBottom: normaliseV(5),
        },
        style: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          elevation: 0,
          height: normaliseV(210),
        },
      }}
    >
      <Tab.Screen
        name="Index"
        component={HomeScreen}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault()
          },
        })}
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
              <TouchableOpacity
                style={styles.tabbarButton}
                onPress={_tabOnPressed('Index')}
              >
                <AntDesign name="home" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeStackNavigator}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault()
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TouchableOpacity
              style={styles.tabbarButton}
              onPress={_tabOnPressed('Search')}
            >
              <AntDesign name="search1" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={InformationScreen}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault()
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TouchableOpacity
              style={styles.tabbarButton}
              onPress={_tabOnPressed('Profile')}
            >
              <FontAwesome5 name="user" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarIconContainer: {
    width: normaliseH(280),
    height: normaliseV(130),
    position: 'absolute',
    bottom: normaliseV(-136),
    alignSelf: 'center',
    borderRadius:normaliseH(80),
    zIndex: -2,
  },
  tabbarButton: {
    height: normaliseV(145),
    borderRadius: 22,
    width: normaliseH(350),
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default BottomTabNavigator
