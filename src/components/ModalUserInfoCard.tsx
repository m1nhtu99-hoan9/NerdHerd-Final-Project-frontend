import i18n from '../i18n'
import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Text,
  Modal,
} from 'react-native'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import { normalise, normaliseV, normaliseH } from '../../src/helpers'
import StyledText from '../../src/components/atomic/StyledText'
import TextInputIcon from '../components/atomic/TextInputIcon'
import { FontAwesome5 } from '@expo/vector-icons'

type ModalFieldProps = {
  headerText: string
  contentText: string
}

const ModalField = (props: ModalFieldProps) => {
  const { headerText, contentText } = props
  const [calculateModalVisible, setCalculateModalVisible] = useState(false)
  const [offerModalVisible, setOfferModalVisible] = useState(false)
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={calculateModalVisible}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View
            style={[
              styles.informationIconContainer,
              { backgroundColor: 'red' },
            ]}
          >
            <Text style={styles.informationIcon}>!</Text>
            {/* <FontAwesome5 name="check" size={32} color="white" /> */}
          </View>
          <View style={styles.modalText}>
            <Text style={styles.modalContentHeaderText}>Result</Text>
            <Text style={styles.modalContentText}>
              Khoan vay cua ban co xac suat thanh cong la 67%
            </Text>
          </View>
          <TouchableOpacity
            style={styles.calculateModalConfirmButton}
            onPress={() => setCalculateModalVisible(false)}
          >
            <Text style={styles.formConfirmText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default ModalField

const styles = StyleSheet.create({
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
    width: (SCREEN_WIDTH / 10) * 7.5, ////////////////////////////
    height: (SCREEN_HEIGHT / 10) * 3, ////////////////////////////
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
    alignItems: 'center',
  },

  modalContentHeaderText: {
    fontSize: normalise(16),
    fontWeight: '600',
    color: 'black',
  },
  modalContentText: {
    fontSize: normalise(13),
    color: 'black',
  },
  informationIconContainer: {
    width: SCREEN_WIDTH / 4.5,
    height: SCREEN_HEIGHT / 8,
    borderRadius: 1000,
    backgroundColor: '#3282b8',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: normaliseV(-120),
  },
  informationIcon: {
    fontSize: normalise(40),
    color: 'white',
    fontWeight: '700',
  },
  calculateModalConfirmButton: {
    width: 90 + '%',
    height: 22 + '%',
    backgroundColor: '#3282b8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    position: 'absolute',
    bottom: normaliseV(40),
  },
  formConfirmText: {
    color: 'white',
    fontSize: normalise(16),
    fontWeight: '600',
  },
  modalText: {
    height: 38 + '%',
    marginTop: normaliseV(170),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normaliseH(40),
  },
})
