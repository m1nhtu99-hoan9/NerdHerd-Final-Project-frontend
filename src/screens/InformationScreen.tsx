import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  Systrace,
  TextInput,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

import GradientContainer from '../components/atomic/GradientContainer'
import { HomeScreenNavigationProps } from '../@types/navigation'

//Import normalise
import { normalise } from '../../src/helpers/Constants'

type UserInfo = {
  fullName: string
  bankName: string
  status: 'normal' | 'warned' | '...' | undefined
  email: string
  phone: string
}
//Get devices's dimension
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function InformationScreen() {
  const [modalVisible, setModalVisible] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>({
    fullName: 'Ngo Tai Phat',
    bankName: 'Techcombank',
    status: 'normal',
    email: 'phatxxxxx@gmail.com',
    phone: '094345xxx',
  })
  const navigation = useNavigation<HomeScreenNavigationProps>()

  return (
    <GradientContainer flexDirection={'column'}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Thong tin</Text>
        </View>
        <View style={styles.information}>
          <Text style={styles.name}>{userInfo.fullName}</Text>
          <Text
            style={styles.infoText}
          >{`Ngan hang: ${userInfo.bankName}`}</Text>
          <Text
            style={styles.infoText}
          >{`Tinh trang: ${userInfo.status}`}</Text>
          <Text style={styles.infoText}>{`Email: ${userInfo.email}`}</Text>
          <Text style={styles.infoText}>{`Phone: ${userInfo.phone}`}</Text>
        </View>
        <Line></Line>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              navigation.replace('Login', { name: 0 })
            }}
          >
            <Text>Dang xuat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.changePasswordButton}
            onPress={() => setModalVisible(true)}
          >
            <Text>Doi mat khau</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.modalContentHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setModalVisible(false)}
              >
                <MaterialIcons name="arrow-back" size={32} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalContentHeaderText}>Doi mat khau</Text>
            </View>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Nhap mat khau cu"
                secureTextEntry
              />

              <TextInput
                style={styles.inputField}
                placeholder="Nhap mat khau moi"
                secureTextEntry
              />

              <TextInput
                style={styles.inputField}
                placeholder="Xac nhan mat khau"
                secureTextEntry
              />

              <TouchableOpacity style={styles.modalContentButton}>
                <Text>Xac nhan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </GradientContainer>
  )
}

const Line = () => {
  return <View style={styles.line}></View>
}

const styles = StyleSheet.create({
  line: {
    height: 3,
    borderRadius: 100,
    width: 65 + '%', /////////////////////////////////////////
    alignSelf: 'center',
    backgroundColor: '#e6e6e6',
    marginTop: normalise(20),
  },
  container: {
    flex: 1,
    width: 100 + '%', /////////////////////////////////////////
  },
  content: {
    backgroundColor: 'white',
    width: (SCREEN_WIDTH / 10) * 9.4, ////////////////////////////////////
    height: (SCREEN_HEIGHT / 10) * 7, ////////////////////////////////////
    alignSelf: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.44,
    shadowRadius: 6.27,
    elevation: 10,
    marginTop: 10 + '%',
  },
  header: {
    flex: 0.1,
    justifyContent: 'flex-end',
    paddingBottom: normalise(10),
  },
  headerText: {
    fontSize: normalise(28),
    fontWeight: '600',
  },
  information: {
    flex: 0.4,
    justifyContent: 'space-around',
  },

  button: {
    flex: 0.5,
  },

  name: {
    fontSize: normalise(20),
  },
  infoText: {
    fontSize: normalise(17),
  },

  logoutButton: {
    borderWidth: 2,
    width: 80 + '%', //////////////////////////////////////
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalise(30),
    alignSelf: 'center',
    borderRadius: 7,
  },
  changePasswordButton: {
    borderWidth: 2,
    width: 80 + '%', //////////////////////////////////////
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 7,
  },

  //Setting up modal
  modalBackground: {
    position: 'absolute',
    width: SCREEN_WIDTH, //////////////////////////////////////
    height: SCREEN_HEIGHT, //////////////////////////////////////
    backgroundColor: 'rgba(0, 0, 0, 0.57)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    position: 'absolute',
    width: (SCREEN_WIDTH / 10) * 8.5, ////////////////////////////
    height: (SCREEN_HEIGHT / 10) * 6.5, ////////////////////////////
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  modalContentHeader: {
    flex: 0.15,
    alignItems: 'center',
    paddingBottom: normalise(10),
    flexDirection: 'row',
    backgroundColor: '#009591',
    borderTopEndRadius: 20,
  },
  inputFieldContainer: {
    flex: 0.85,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  inputField: {
    textAlign: 'center',
    height: normalise(50),
    marginVertical: 15,
    width: 80 + '%', //////////////////////////////////
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: normalise(17),
    alignSelf: 'center',
  },
  modalContentButton: {
    marginTop: normalise(20),
    borderWidth: 2,
    width: 65 + '%', ///////////////////////////////////
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 7,
  },
  modalContentHeaderText: {
    fontSize: normalise(28),
    fontWeight: '600',
  },
  backButton: {
    padding: 15,
  },
})
