// import i18n from '../i18n'
// import React, { useState } from 'react'
// import {
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   TextInput,
//   Animated,
//   TouchableOpacity,
// } from 'react-native'
// import { useNavigation } from '@react-navigation/native'
// import { SearchScreenNavigationProps } from '../@types/navigation'
// import { AntDesign } from '@expo/vector-icons'

// import GradientContainer from '../components/atomic/GradientContainer'
// import { HomeScreenNavigationProps } from '../@types/navigation'

// //Import normalise
// import { normalise } from '../../src/helpers/Constants'
// import { normaliseH, normaliseV } from '../helpers'

// import StyledText from '../../src/components/atomic/StyledText'
// import ApprovalCard from '../components/ApprovalCard'
// import { ScrollView } from 'react-native-gesture-handler'

// //Get devices's dimension
// const SCREEN_HEIGHT = Dimensions.get('window').height
// const SCREEN_WIDTH = Dimensions.get('window').width

// export default function ApprovalScreen() {
//   const navigation = useNavigation<SearchScreenNavigationProps>()
//   const heightView = useState(new Animated.Value(normaliseV(700)))[0]
//   const marginTop = useState(new Animated.Value(normaliseV(400)))[0]
//   const opacity = useState(new Animated.Value(0))[0]
//   const [buttonText, setButtonText] = useState('Gửi mã OTP')

//   return (
//     <GradientContainer flexDirection={'column'}>
//       <View style={styles.container}>
//         <View style={styles.content}>
//           <View style={styles.header}>
//             <StyledText fontWeight="bold" style={styles.headerText}>
//               {i18n.t('search._nav')}
//             </StyledText>
//             <TouchableOpacity style={styles.filterBtn}>
//               <Text>Bo loc</Text>
//               <AntDesign name="filter" size={26} color="black" />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={styles.approvalCardContainer}>
//           <ScrollView>
//             <ApprovalCard />
//             <ApprovalCard />
//             <ApprovalCard />
//             <ApprovalCard />
//             <ApprovalCard />
//           </ScrollView>
//         </View>
//       </View>
//     </GradientContainer>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     width: 100 + '%', /////////////////////////////////////////
//     alignItems: 'center',
//     paddingTop: normaliseV(140),
//     height: 100 + '%',
//   },
//   content: {
//     backgroundColor: 'white',
//     width: (SCREEN_WIDTH / 10) * 9.4, ////////////////////////////////////
//     height: 10 + '%', ////////////////////////////////////
//     borderRadius: 15,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 6,
//     },
//     shadowOpacity: 0.44,
//     shadowRadius: 6.27,
//     elevation: 10,
//     paddingHorizontal: normaliseH(40),
//   },
//   header: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: 'white',
//   },
//   approvalCardContainer: {
//     marginTop: normaliseV(20),
//     backgroundColor: 'transparent',
//     width: (SCREEN_WIDTH / 10) * 9.4,
//     height: (SCREEN_HEIGHT / 10) * 7,
//   },

//   headerText: {
//     fontSize: normalise(29),
//     paddingTop: normaliseV(45),
//     color: 'black',
//   },
//   filterBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
// })
