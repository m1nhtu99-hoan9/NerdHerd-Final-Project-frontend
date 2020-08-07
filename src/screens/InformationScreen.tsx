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
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

import { HomeScreenNavigationProps } from '../@types/navigation'

//Get devices's dimension
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function InformationScreen() {
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation<HomeScreenNavigationProps>()

  return (
    <LinearGradient colors={['#017DDC', '#00BCA0']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Thong tin</Text>
        </View>
        <View style={styles.information}>
          <Text style={styles.name}>NGO TAI PHAT</Text>
          <Text style={styles.infoText}>Ngan hang: Techcombank</Text>
          <Text style={styles.infoText}>Tinh trang: Binh thuong</Text>
          <Text style={styles.infoText}>Email: phatxxxxx@gmail.com</Text>
          <Text style={styles.infoText}>So dien thoai: 094345xxx</Text>
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
    </LinearGradient>
  )
}

const Line = () => {
  return <View style={styles.line}></View>
}

const styles = StyleSheet.create({
  line: {
    height: 3,
    borderRadius: 100,
    width: 65 + '%',
    alignSelf: 'center',
    backgroundColor: '#e6e6e6',
    marginTop: 20
  },
  container: {
    flex: 1,
    width: 100 + '%',
  },
  content: {
    backgroundColor: 'white',
    width: (SCREEN_WIDTH / 10) * 9.4,
    height: (SCREEN_HEIGHT / 10) * 7,
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
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 28,
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
    fontSize: 20,
  },
  infoText: {
    fontSize: 17,
  },

  logoutButton: {
    borderWidth: 2,
    width: 80 + '%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    alignSelf: 'center',
    borderRadius: 7,
  },
  changePasswordButton: {
    borderWidth: 2,
    width: 80 + '%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 7,
  },

  //Setting up modal
  modalBackground: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0.57)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    position: 'absolute',
    width: (SCREEN_WIDTH / 10) * 8.5,
    height: (SCREEN_HEIGHT / 10) * 6.5,
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
    paddingBottom: 10,
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
    height: 50,
    marginVertical: 15,
    width: 80 + '%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 17,
    alignSelf: 'center',
  },
  modalContentButton: {
    marginTop: 20,
    borderWidth: 2,
    width: 65 + '%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 7,
  },
  modalContentHeaderText: {
    fontSize: 28,
    fontWeight: '600',
  },
  backButton: {
    padding: 15,
  },
})
