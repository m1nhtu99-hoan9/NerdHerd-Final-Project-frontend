import React, { useEffect, useState } from 'react'
import { Animated, ActivityIndicator, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import { normalise, normaliseH, normaliseV } from '../../helpers'
import { StyledText } from '.'

type SpinnerProps = {
  isLoading: boolean
}
type SpinnerState = {
  isLoading: boolean
  blurOpacity: number
  blurIndex: number
  animatedIndex: number
  noticeOpacity: Animated.Value
}


export default class Spinner extends React.Component<SpinnerProps, SpinnerState> {
  constructor(props: SpinnerProps) {
    super(props)   

    this.state = {
      isLoading: true,
      blurOpacity: 1,
      blurIndex: 8,
      noticeOpacity: new Animated.Value(0),
      animatedIndex: 8
    }

    this._stopAnimation = this._stopAnimation.bind(this)
    this._startAnimation = this._startAnimation.bind(this)
    this._fireLoading = this._fireLoading.bind(this)
    this._fireUnloading = this._fireUnloading.bind(this)
  }

  componentDidMount() {
    if (this.props.isLoading) {
      this._stopAnimation()
    } else {
      this._startAnimation()
    }
  }
  
  // const [blurOpacity, setBlurOpacity] = useState(0)
  // const [blurIndex, setBlurIndex] = useState(-2)
  // const noticeOpacity = useState(new Animated.Value(0))[0]
  // const [animatedIndex, setAnimatedIndex] = useState(-2)

  _stopAnimation = () => {
     this.setState({
       // prop: isLoading: false,
       animatedIndex: -2, 
       blurIndex: -6, 
       blurOpacity: 0
     })
    this._fireUnloading()
  }
  _startAnimation = () => {
    this.setState({
      isLoading: true,
      animatedIndex: 8,
      blurIndex: 8,
      blurOpacity: 1
    })
    this._fireLoading()
    //setLoading(true)
  }

  _fireLoading = () => {
    Animated.timing(this.state.noticeOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false,
    }).start()
  }

  _fireUnloading = () => {
    Animated.timing(this.state.noticeOpacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start()
  }


  render () {
    // LOADING INDICATOR ANIMATION
    return <>
      <BlurView
        intensity={80}
        tint={'dark'}
        style={[
          styles.blurViewContainer,
          {
            zIndex: this.state.blurIndex,
            opacity: this.state.blurOpacity,
          },
        ]}
      ></BlurView>
      <Animated.View
        style={[
          styles.animatedNoticeContainer,
          { opacity: this.state.noticeOpacity, zIndex: this.state.animatedIndex },
        ]}
      >
        <ActivityIndicator
          style={{ position: 'absolute', top: normaliseV(100) }}
          size="large"
          color="lightgrey"
          animating={this.props.isLoading}
        />
        <StyledText
          fontWeight="bold"
          style={{ marginTop: normaliseV(260), fontSize: normalise(14) }}
        >
          Đang tải...
        </StyledText>
      </Animated.View>
    </>
    // END: LOADING INDICATOR ANIMATION
  }
}

const styles = StyleSheet.create({
  blurViewContainer: {
    height: normaliseV(1630),
    width: normaliseH(1290),
    top: normaliseV(140),
    position: 'absolute',
    borderRadius: 15,
  },
  animatedNoticeContainer: {
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    top: normaliseV(850),
    width: normaliseH(550),
    height: normaliseV(350),
    backgroundColor: 'black',
    position: 'absolute',
  },
})
