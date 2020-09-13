/* (─‿‿─) If you really think about it, 
   isn't that Promise is a kind of state machine? */
import {
  asyncLogin,
  asyncGetCrescore,
  asyncGetOtp,
  asyncLogout,
  asyncGetUserProfile,
  asyncRegister,
} from './API'

import AppMachine from './AppMachine'

export {
  AppMachine,
  asyncLogin,
  asyncGetCrescore,
  asyncGetOtp,
  asyncLogout,
  asyncGetUserProfile,
  asyncRegister,
}
