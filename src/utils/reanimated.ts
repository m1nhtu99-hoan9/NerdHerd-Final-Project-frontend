import Animated, { Easing, useCode } from 'react-native-reanimated'

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
} = Animated

const DURATION = 500

/**
 * @TODO run the animation during the given duration
 * @param posValue: <AnimatedValue | number> value to start the animation from 
 * @param dest:     <AnimatedValue | number> value which the animation ends up at
 */ 
const runTiming = (posValue: any, dest: any) => {
  const innerClock = new Clock()

  const state: Animated.TimingState = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  }

  const config: Animated.TimingConfig = {
    duration: DURATION,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.quad),
  }

  return block([
    cond(clockRunning(innerClock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, posValue),
      set(state.frameTime, 0),
      // @ts-ignore
      set(config.toValue, dest),
      startClock(innerClock),
    ]),
    timing(innerClock, state, config),
    cond(state.finished, debug('stop clock', stopClock(innerClock))),
    state.position,
  ])
}

export {
  runTiming
}