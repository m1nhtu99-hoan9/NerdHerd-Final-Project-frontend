import i18n from '../i18n'
import React from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import { normalise, normaliseV, normaliseH } from '../../src/helpers'
import StyledText from '../../src/components/atomic/StyledText'
import { FontAwesome5 } from '@expo/vector-icons'

type ModalContentProps = {
  headerText: string
  contentText: string
  color: string
  icon: string
}

const ModalContent = (props: ModalContentProps) => {
  const { headerText, contentText, color, icon } = props

  let finalIcon

  switch (icon) {
    case '!':
      finalIcon = <Text style={styles.informationIcon}>!</Text>
      break
    case 'check':
      finalIcon = <FontAwesome5 name="check" size={32} color="white" />
      break
  }

  return (
    <View style={styles.modalBackground}>
      <View style={styles.modalContent}>
        <View
          style={[styles.informationIconContainer, { backgroundColor: color }]}
        >
          {finalIcon}
        </View>
        <View style={styles.modalText}>
          <StyledText fontWeight="bold" style={styles.modalContentHeaderText}>
            {headerText}
          </StyledText>
          <StyledText style={styles.modalContentText}>{contentText}</StyledText>
        </View>
      </View>
    </View>
  )
}

export default ModalContent

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
  modalText: {
    height: 38 + '%',
    marginTop: normaliseV(170),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normaliseH(40),
  },
})
