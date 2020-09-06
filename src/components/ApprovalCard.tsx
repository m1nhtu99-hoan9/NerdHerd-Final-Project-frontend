import i18n from '../i18n'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Animated,
  TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SearchScreenNavigationProps } from '../@types/navigation'
import { FontAwesome } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

import GradientContainer from '../components/atomic/GradientContainer'
import { HomeScreenNavigationProps } from '../@types/navigation'

//Import normalise
import { normalise } from '../../src/helpers/Constants'
import { normaliseH, normaliseV } from '../helpers'

import StyledText from '../../src/components/atomic/StyledText'
import { ApprovalScreen } from '../screens'

//Get devices's dimension
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const ApprovalCard = () => {
    return (
        <View style={styles.approvalCard}>
            <View style={styles.header}>
                <Text>Phone Num</Text>
                <FontAwesome name="circle" size={17} color="red" />
            </View>
            <View style={styles.content}>
                <Text>Ngay</Text>
                <Text>Diem</Text>
                <Text>Rui ro</Text>
                <Text>Status</Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerBtn}>
                    <Text>Xem them</Text>
                    <Entypo name="chevron-down" size={24} color="blue" />
                </TouchableOpacity>
            </View>
        </View>
  )
}

export default ApprovalCard


const styles = StyleSheet.create({
  approvalCard: {
    width: (SCREEN_WIDTH / 10) * 9.4,
    height: (SCREEN_HEIGHT / 10) * 3,
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: normaliseV(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.44,
    shadowRadius: 6.27,
    elevation: 10,
  },
  header: {
    flex: 0.20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  content: {
    flex: 0.65,
    justifyContent: 'flex-end'
  },
  footer: {
      flex: 0.15,
  },
  footerBtn: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
  }
})
