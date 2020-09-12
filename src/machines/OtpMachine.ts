import { Machine } from 'xstate'
import { OtpMachineContext, OtpMachineEvent, OtpMachineStateScheme } from '../@types/machines'

const OtpMachine = Machine<OtpMachineContext, OtpMachineStateScheme, OtpMachineEvent>({
  id: 'otp',
  initial: 'IDLE',
  states: {
    'IDLE': {},
    'REQUEST_SENT': {},
    'RESOLVING_REQUEST': {},
    'OTP_RECEIVED': {},
    'FAILURE': {}
  }
})

export default OtpMachine