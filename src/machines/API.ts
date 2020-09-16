import { create } from 'apisauce'
import { btoa as b64_encode } from 'Base64'
import { construct } from 'ramda'

/* (─‿‿─) If you really think about it, 
   isn't that Promise is a kind of state machine? */

const BASE_URI = 'https://nerdherd-crescorex.herokuapp.com/'

const api = create({
  baseURL: BASE_URI,
})

type ReactStateSetter<T> = React.Dispatch<React.SetStateAction<T>>

/** Asynchronously request to login (public route)
 * @param phoneNum: user's input phone number as string
 * @param rawPassword: user's input password
 */
export function asyncLogin(phoneNum: string, rawPassword: string) {
  const decodedCreds = b64_encode(`${phoneNum}:${rawPassword}`)

  return api.get<LoginOkResponse, ErrorResponse>(
    '/auth/login',
    {},
    {
      headers: {
        Authorization: `Basic ${decodedCreds}`,
      },
    },
  )
}

/** Asynchronously request to logout (protected route)
 * @param userToken: this user's session access token stored in state machine's context
 */
export function asyncLogout(userToken: string) {
  return (
    api
      // for this route, success response has the same schema as error response
      .post<ErrorResponse>(
        '/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      )
  )
}

/** Asynchronously request to register new user (public route)
 * @param inputForm: object holds to-be-registered user's information
 */
export function asyncRegister(inputForm: RegisterForm) {
  return api.post<RegisterOkResponse, ErrorResponse>(
    '/auth/register',
    inputForm,
  )
}

/** Asynchronously request an OTP code (protected route)
 * @param userToken: this user's session access token stored in state machine's context
 * @param customerPhone: customer's phone number
 */
export function asyncGetOtp(userToken: string) {
  return function (customerPhone: string) {
    return api.get<OtpOkResponse, ErrorResponse>(
      '/otp',
      { phone: customerPhone },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    )
  }
}

/** Asynchronously request customer's credit score (protected route)
 * @param userToken: this user's session access token stored in state machine's context
 * @param customerPhone: customer's phone number
 */
export function asyncGetCrescore(userToken: string) {
  return function (customerPhone: string) {
    return api.get<ScoreOkResponse, ErrorResponse>(
      '/crescore',
      { phone: customerPhone },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    )
  }
}

/** Asynchronously request current user's profile (protected route)
 * @param userToken: this user's session access token stored in state machine's context
 */
export function asyncGetUserProfile(userToken: string) {
  return api.get<ProfileOkResponse, ErrorResponse>(
    '/profile',
    {},
    // server will decode user token to get user's phone number,
    // which is used as login id
    { headers: { Authorization: `Bearer ${userToken}` } },
  )
}
