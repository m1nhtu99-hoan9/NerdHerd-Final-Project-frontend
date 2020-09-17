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
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { Container, Form } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import { normalise, normaliseV, normaliseH, PATTERN } from '../../src/helpers'
import StyledText from '../../src/components/atomic/StyledText'
import TextInputIcon from '../components/atomic/TextInputIcon'
import { FontAwesome5 } from '@expo/vector-icons'

import RNSpeedometer from 'react-native-speedometer'
import RNFadedScrollView from 'rn-faded-scrollview'
import RNPickerSelect from 'react-native-picker-select'
import Slider from '@react-native-community/slider'

import { useForm, Controller } from 'react-hook-form'

import ModalContent from '../components/ModalUserInfoCard'
import { TSpan } from 'react-native-svg'
import { times } from 'ramda'

interface FormInput {
  loanAmount_calculate: number | null
  loanAmount_offer: number | null
}

interface UserCreditInfoCardProps {
  phoneNumber: string
  creditScore: number
}

const Line = function () {
  return <View style={styles.line} />
}

const round = (num: Number) => (places: Number) => {
  // @ts-ignore; because TS too dump to understand the brilliance of this
  return +(Math.round(num + 'e+' + places) + 'e-' + places)
}

export default function UserCreditInfoCard(props: UserCreditInfoCardProps) {
  const { phoneNumber, creditScore } = props

  const placeholderLoanType = {
    label: i18n.t('home.loanOptionsInput'),
    value: null,
    color: '#9EA0A4',
  }

  const placeholderDuration = {
    label: 'Chọn thời hạn vay',
    value: null,
    color: '#9EA0A4',
  }

  const loanTypeContent = [
    { label: 'Vay tiêu dùng', value: 'consumption' },
    { label: 'Vay trả góp', value: 'installment' },
    { label: 'Vay mua ô tô', value: 'buyCar' },
  ]

  const loanDurationContent = [
    { label: '1 Tháng', value: '1month' },
    { label: '2 Tháng', value: '2months' },
    { label: '3 Tháng', value: '3months' },
    { label: '6 Tháng', value: '6months' },
    { label: '9 Tháng', value: '9months' },
    { label: '12 Tháng', value: '12months' },
    { label: '16 Tháng', value: '16months' },
    { label: '24 Tháng', value: '24months' },
    { label: '36 Tháng', value: '36months' },
  ]

  const { control, handleSubmit, errors, trigger, reset } = useForm<FormInput>()

  const [fadedOpacity, setFadedOpacity] = useState(['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)'])

  // State of modal
  const [calculateModalVisible, setCalculateModalVisible] = useState(false)
  const [offerModalVisible, setOfferModalVisible] = useState(false)

  // Picker values
  const [calculatePickerValue, setCalculatePickerValue] = useState(null)
  const [offerPickerValue, setOfferPickerValue] = useState(null)
  const [durationPickerValue, setOfferPickerDuration] = useState(null)

  // Slider value
  const [sliderValue, setSliderValue] = useState(4.5)

  // Validation warnings
  const [calculatePickerWarning, setCalculatePickerWarning] = useState(
    <Text></Text>,
  )
  const [offerPickerWarning, setOfferPickerWarning] = useState(<Text></Text>)
  const [durationPickerWarning, setDurationPickerWarning] = useState(
    <Text></Text>,
  )

  const calculateFormOnSubmitted = (data: Object) => {
    setCalculateModalVisible(true)
    reset({ loanAmount_calculate: null })
  }

  const offerFormOnSubmitted = (data: Object) => {
    setOfferModalVisible(true)
    reset({ loanAmount_offer: null })
  }

  const _showErrorMessage = function (props: any): JSX.Element | undefined {
    switch (props) {
      case 'required':
        return (
          <View style={styles.validationTextContainer}>
            <Text style={styles.validationText}>
              {i18n.t('home.validation.required')}
            </Text>
          </View>
        )
      case 'min':
        return (
          <View style={styles.validationTextContainer}>
            <Text style={styles.validationText}>
              {i18n.t('home.validation.invalidAmount')}
            </Text>
          </View>
        )
      case 'max':
        return (
          <View style={styles.validationTextContainer}>
            <Text style={styles.validationText}>
              {i18n.t('home.validation.invalidAmount')}
            </Text>
          </View>
        )
      case 'pattern':
        return (
          <View style={styles.validationTextContainer}>
            <Text style={styles.validationText}>
              {i18n.t('home.validation.invalidAmount')}
            </Text>
          </View>
        )
    }
  }
  //@ts-ignore
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  };

  return (
    <>
      <Container style={styles.content}>
        {/*Information Modal for loanCalculated field*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={calculateModalVisible}
        >
          <ModalContent
            icon="!"
            headerText={'Kết quả'}
            contentText={'Khoản vay của bạn có xác suất thành công là 67%'}
            color="#3282b8"
          ></ModalContent>
          <TouchableOpacity
            style={styles.calculateModalConfirmButton}
            onPress={() => setCalculateModalVisible(false)}
          >
            <Text style={styles.formConfirmText}>OK</Text>
          </TouchableOpacity>
        </Modal>

        {/*Offer Modal for loanOffer field*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={offerModalVisible}
        >
          <ModalContent
            icon="check"
            headerText={'Thành công'}
            contentText={`Đã đề xuất khoản vay thành công với lãi suất ${sliderValue}%/năm`}
            color="#36ad51"
          ></ModalContent>
          <TouchableOpacity
            style={styles.offerModalConfirmButton}
            onPress={() => setOfferModalVisible(false)}
          >
            <Text style={styles.formConfirmText}>OK</Text>
          </TouchableOpacity>
        </Modal>

        <KeyboardAvoidingView
          keyboardVerticalOffset={120}
          behavior="padding"
          enabled
        >
          <ScrollView onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              setFadedOpacity(['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)'])
            }
            if (!isCloseToBottom(nativeEvent)) {
              setFadedOpacity(['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)'])
            }
          }}>
            <View style={styles.phoneNumContainer}>
              <StyledText fontWeight="regular" style={styles.phoneNum}>
                {phoneNumber}
              </StyledText>
            </View>

            <Line></Line>

            <View style={styles.creditScoreContainer}>
              <StyledText fontWeight="bold" style={styles.creditScoreHeader}>
                {i18n.t('home.firstSubHeader')}
              </StyledText>

              <RNSpeedometer value={creditScore*5.5 + 300} size={normalise(220)} minValue={300} maxValue={850} />
              <View style={styles.speedometerContainer}>
                <View style={{}}>
                  <Image
                    source={require('../images/bar.png')}
                    style={{ width: 220, height: 185, position: 'relative' }}
                  ></Image>
                  <StyledText style={styles.score} fontWeight="bold">
                    {String(creditScore*5.5 + 300)}
                  </StyledText>
                </View>
              </View>

              <StyledText fontWeight="regular" style={styles.creditScoreNote}>
                {i18n.t('home.suggestionContent.middle')}
              </StyledText>
            </View>

            <Line></Line>

            <View style={styles.loanDetailContainer}>
              <Form key={1}>
                <StyledText fontWeight="bold" style={styles.loanDetailHeader}>
                  {i18n.t('home.secondSubHeader')}
                </StyledText>

                {/* <StyledText
                  fontWeight="regular"
                  style={styles.loanDetailResult}
                >
                  Content goes here
                </StyledText> */}

                <View style={styles.loanType}>
                  <RNPickerSelect
                    placeholder={placeholderLoanType}
                    onValueChange={(value) => setCalculatePickerValue(value)}
                    items={loanTypeContent}
                    value={calculatePickerValue}
                  />
                  <TextInputIcon></TextInputIcon>
                </View>

                <Text style={styles.validationText}>
                  {calculatePickerWarning}
                </Text>

                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <TextInput
                      // validation code-block
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      value={value}
                      maxLength={12}
                      // End of validation code-block
                      keyboardType={'number-pad'}
                      style={styles.loanAmount}
                      placeholder={i18n.t('home.loanAmountInput')}
                    />
                  )}
                  name="loanAmount_calculate"
                  rules={{
                    required: true,
                    minLength: 6,
                    min: 1000000,
                    max: 100000000000,
                    pattern: /^(1|2|3|4|5|6|7|8|9)+([0-9])/,
                  }}
                  defaultValue=""
                />
                {_showErrorMessage(errors.loanAmount_calculate?.type)}

                <TouchableOpacity
                  style={styles.buttonNext}
                  onPress={async () => {
                    calculatePickerValue == null
                      ? setCalculatePickerWarning(
                          <Text>{i18n.t('home.validation.required')}</Text>,
                        )
                      : setCalculatePickerWarning(<Text></Text>)
                    if (
                      (await trigger('loanAmount_calculate')) == true &&
                      calculatePickerValue != null
                    )
                      calculateFormOnSubmitted('ok')
                  }}
                  //onPress={handleSubmit(calculateFormOnSubmitted)}
                >
                  <StyledText fontWeight="bold" style={styles.buttonText}>
                    {i18n.t('home.submitBtn')}
                  </StyledText>
                </TouchableOpacity>
              </Form>
            </View>

            <Line></Line>

            <View style={styles.recommendContainer}>
              <Form key={2}>
                <StyledText fontWeight="bold" style={styles.loanDetailHeader}>
                  {i18n.t('home.recommendContent.header')}
                </StyledText>

                {/* <StyledText
                  fontWeight="regular"
                  style={styles.loanDetailResult}
                >
                  Content goes here
                </StyledText> */}

                <View
                  style={styles.loanType}
                  onTouchEnd={() => console.log('Pressed')}
                >
                  <RNPickerSelect
                    placeholder={placeholderLoanType}
                    onValueChange={(value) => setOfferPickerValue(value)}
                    items={loanTypeContent}
                    value={offerPickerValue}
                  />
                  <TextInputIcon></TextInputIcon>
                </View>
                <View style={styles.validationTextContainer}>
                  <Text style={styles.validationText}>
                    {offerPickerWarning}
                  </Text>
                </View>

                <View style={styles.loanType}>
                  <RNPickerSelect
                    placeholder={placeholderDuration}
                    onValueChange={(value) => setOfferPickerDuration(value)}
                    items={loanDurationContent}
                    value={durationPickerValue}
                  />
                  <TextInputIcon></TextInputIcon>
                </View>
                <View style={styles.validationTextContainer}>
                  <Text style={styles.validationText}>
                    {durationPickerWarning}
                  </Text>
                </View>

                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <TextInput
                      // validation code-block
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      value={value}
                      maxLength={12}
                      // End of validation code-block
                      keyboardType="number-pad"
                      editable={true}
                      style={styles.loanAmount}
                      placeholder={i18n.t('home.loanAmountInput')}
                    />
                  )}
                  name="loanAmount_offer"
                  rules={{
                    required: true,
                    minLength: 6,
                    min: 1000000,
                    max: 100000000000,
                    pattern: /^(1|2|3|4|5|6|7|8|9)+([0-9])/,
                  }}
                  defaultValue=""
                />
                {_showErrorMessage(errors.loanAmount_offer?.type)}

                <View style={styles.sliderContainer}>
                  <StyledText fontWeight="bold" style={{...styles.loanDetailHeader, paddingLeft: normaliseH(150)}}>Lãi suất</StyledText>
                  <View
                    style={{ width: 100 + '%', marginTop: normaliseV(30), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Slider
                      style={{ width: 200, height: 40 }}
                      minimumValue={4.5}
                      maximumValue={13.5}
                      step={0.5}
                      minimumTrackTintColor="green"
                      maximumTrackTintColor="lightgrey"
                      onValueChange={(value) => setSliderValue(value)}
                    />
                    <StyledText fontWeight='bold' style={{...styles.modalContentText, fontSize: normalise(14), right: normaliseH(70), position:'absolute'}}>{`${sliderValue}%`}</StyledText>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.buttonNext}
                  onPress={async () => {
                    durationPickerValue == null
                      ? setDurationPickerWarning(
                          <Text>{i18n.t('home.validation.required')}</Text>,
                        )
                      : setDurationPickerWarning(<Text></Text>)

                    offerPickerValue == null
                      ? setOfferPickerWarning(
                          <Text>{i18n.t('home.validation.required')}</Text>,
                        )
                      : setOfferPickerWarning(<Text></Text>)

                    if (
                      (await trigger('loanAmount_offer')) == true &&
                      durationPickerValue != null &&
                      offerPickerValue != null
                    ) {
                      offerFormOnSubmitted('cf')
                    }

                    // if (
                    //   durationPickerValue == null &&
                    //   offerPickerValue == null
                    // ) {
                    //   setOfferPickerWarning(
                    //     <Text>{i18n.t('home.validation.required')}</Text>,
                    //   )
                    //   setDurationPickerWarning(
                    //     <Text>{i18n.t('home.validation.required')}</Text>,
                    //   )
                    // }
                    // if (
                    //   durationPickerValue == null &&
                    //   offerPickerValue != null
                    // ) {
                    //   setDurationPickerWarning(
                    //     <Text>{i18n.t('home.validation.required')}</Text>,
                    //   )
                    //   setOfferPickerWarning(<Text></Text>)
                    // }
                    // if (
                    //   durationPickerValue != null &&
                    //   offerPickerValue == null
                    // ) {
                    //   setDurationPickerWarning(<Text></Text>)
                    //   setOfferPickerWarning(
                    //     <Text>{i18n.t('home.validation.required')}</Text>,
                    //   )
                    // }
                    // if (
                    //   durationPickerValue != null &&
                    //   offerPickerValue != null
                    // ) {
                    //   setDurationPickerWarning(<Text></Text>)
                    //   setOfferPickerWarning(<Text></Text>)
                    //   if (await trigger('loanAmount_offer')) {
                    //     offerFormOnSubmitted('cf')
                    //   }
                    // }
                  }}
                >
                  <StyledText fontWeight="bold" style={styles.buttonText}>
                    {i18n.t('home.recommendContent.submitBtn')}
                  </StyledText>
                </TouchableOpacity>
              </Form>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <LinearGradient
            style={{
              position: 'absolute',
              bottom: normaliseV(-1),
              borderRadius: 0,
              width: 100 + '%',
              alignSelf: 'center',
              height: normaliseV(110),
            }}
            colors={fadedOpacity}
            pointerEvents={'none'}
          />
      </Container>
    </>
  )
}

const styles = StyleSheet.create({
  line: {
    height: 25,
    width: 100 + '%',
    backgroundColor: '#e3d3d3',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    height: 100,
    justifyContent: 'flex-end',
  },
  headerText: {
    paddingBottom: 20,
    fontSize: 28,
  },
  content: {
    flex: 1,
    width: (SCREEN_WIDTH / 10) * 9.4,
    flexDirection: 'column',
    alignContent: 'center',
  },
  footer: {
    flex: 0.08,
  },
  // ------------------------------------ Header field
  phoneNumContainer: {
    height: 60,
    width: 100 + '%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normaliseH(40),
  },
  phoneNum: {
    fontSize: normalise(30),
    color: 'black',
  },
  // ------------------------------------ Credit score field
  creditScoreContainer: {
    width: 100 + '%',
    height: 320,
    justifyContent: 'space-between',
    paddingHorizontal: normaliseH(40),
  },
  creditScoreHeader: {
    fontSize: normalise(20),
    paddingTop: normaliseV(30),
    color: 'black',
  },

  creditScoreNote: {
    paddingTop: 60,
    paddingBottom: 15,
    fontSize: normalise(13),
    color: 'black',
  },

  // ------------------------------------ Loan detail field
  loanDetailContainer: {
    height: 350,
    width: 100 + '%',
    paddingHorizontal: normaliseH(40),
  },
  loanDetailHeader: {
    fontSize: normalise(20),
    paddingTop: normaliseV(30),
    color: 'black',
  },
  loanDetailResult: {
    fontSize: normalise(13),
    paddingTop: normaliseV(30),
    color: 'black',
  },

  loanType: {
    height: 50,
    marginVertical: 20,
    width: 80 + '%',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingLeft: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  loanAmount: {
    height: 50,
    marginVertical: 20,
    width: 80 + '%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 17,
    alignSelf: 'center',
  },
  buttonNext: {
    paddingHorizontal: 40,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 20,
    height: 50,
    width: 170,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'black',
    alignSelf: 'center',
    fontSize: normalise(14),
    lineHeight: 20,
    fontWeight: '600',
  },
  validationTextContainer: {
    alignItems: 'center',
  },
  validationText: {
    fontSize: normalise(14),
    color: 'rgba(242, 38, 19, 1)',
    paddingHorizontal: normaliseH(80),
    marginTop: normaliseV(-50),
    alignSelf: 'center',
  },
  // ------------------------------------ Recommend field
  recommendContainer: {
    height: 540,
    width: 100 + '%',
    paddingHorizontal: normaliseH(40),
  },
  speedometerContainer: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: normaliseV(140),
  },
  score: {
    color: 'black',
    fontSize: normalise(28),
    position: 'absolute',
    alignSelf: 'center',
    marginTop: normalise(111),
  },
  sliderContainer: {
    width: 100 + '%',
  },

  //Setting up modal

  // modalBackground: {
  //   position: 'absolute',
  //   width: SCREEN_WIDTH, //////////////////////////////////////
  //   height: SCREEN_HEIGHT, //////////////////////////////////////
  //   backgroundColor: 'rgba(0, 0, 0, 0.57)',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // modalContent: {
  //   position: 'absolute',
  //   width: (SCREEN_WIDTH / 10) * 7.5, ////////////////////////////
  //   height: (SCREEN_HEIGHT / 10) * 3, ////////////////////////////
  //   backgroundColor: 'white',
  //   borderRadius: 4,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 9,
  //   },
  //   shadowOpacity: 0.5,
  //   shadowRadius: 12.35,

  //   elevation: 19,
  //   alignItems: 'center',
  // },

  modalBackground: {
    position: 'absolute',
    width: SCREEN_WIDTH, //////////////////////////////////////
    height: SCREEN_HEIGHT, //////////////////////////////////////
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    position: 'absolute',
    width: (SCREEN_WIDTH / 10) * 7.5, ////////////////////////////
    height: (SCREEN_HEIGHT / 10) * 3, ////////////////////////////
    backgroundColor: 'transparent',
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
    width: 70 + '%',
    height: 7 + '%',
    backgroundColor: '#3282b8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    position: 'absolute',
    bottom: normaliseV(735),
    left: normaliseH(207),
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

  // Offer modal style
  offerModalConfirmButton: {
    width: 70 + '%',
    height: 7 + '%',
    backgroundColor: '#36ad51',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    position: 'absolute',
    bottom: normaliseV(735),
    left: normaliseH(207),
  },
  successIconContainer: {
    width: SCREEN_WIDTH / 4.5,
    height: SCREEN_HEIGHT / 8,
    borderRadius: 1000,
    backgroundColor: '#36ad51',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: normaliseV(-120),
  },
})
