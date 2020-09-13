import { create, ApiResponse } from 'apisauce'
import { btoa as b64_encode } from 'Base64'

const BASE_URI = 'https://nerdherd-crescorex.herokuapp.com/'
const api = create({
  baseURL: BASE_URI,
})

/** Asynchronously request to login (public route)
 * @param phoneNum: user's input phone number as string
 * @param rawPassword: user's input password
 * @param onSuccess: a function takes returned access token and persist it in AsyncStorage
 * @param onProblem: a function takes retunrned error message and display it
 */
const asyncLogin = (phoneNum: string, rawPassword: string) => (
  onSuccess: (receivedToken: string) => void,
  onProblem: (errorMessage: string) => void,
) => {
  const decodedCreds = b64_encode(`${phoneNum}:${rawPassword}`)

  return api
    .get<LoginOkResponse, ErrorResponse>(
      '/auth/login',
      {},
      {
        headers: {
          Authorization: `Basic ${decodedCreds}`,
        },
      },
    )
    .then((res) => {
      if (!res.problem) {
        // implement `onSuccess` callback on the received JWT string
        onSuccess(res.data?.jwt as string)
      } else {
        // implement `onProblem` callback on error message
        onProblem(Object.values(res.data as ErrorResponse)[0])
      }
    })
    .catch((err) => {
      onProblem(err.toString())
    })
}

/** Asynchronously request to logout (protected route)
 * @param userToken: this user's session access token stored in AsyncStorage
 * @param onSuccess: a function implement side effects (i.e. navigation stuffs) in case of success
 * @param onProblem: <optional> a function takes returned error message and display it
 */
const asyncLogout = (userToken: string) => (
  onSuccess: () => void,
  onProblem?: (errorMessage: string) => void,
) => {
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
      .then((res) => {
        if (!res.problem) {
          onSuccess()
        } else {
          // implement `onProblem` callback on error message only if `onProblem` is defined
          onProblem && onProblem(Object.values(res.data as ErrorResponse)[0])
        }
      })
      .catch((err) => {
        if (onProblem) {
          onProblem(err.toString())
        } else {
          console.error(err.stack)
        }
      })
  )
}

/** Asynchronously request to register new user (public route)
 * @param inputForm: object holds to-be-registered user's information
 * @param onSuccess: a function implement side effects (i.e. navigation stuffs) in case of success
 * @param onProblem: <optional> a function takes returned error message and display it
 */
const asyncRegister = (inputForm: RegisterForm) => (
  onSuccess: () => void,
  onProblem?: (errorMessage: string) => void,
) => {
  return api
    .post<RegisterOkResponse, ErrorResponse>('/auth/register', inputForm)
    .then((res) => {
      if (!res.problem) {
        onSuccess()
      } else {
        // implement `onProblem` callback on error message only if `onProblem` is defined
        onProblem && onProblem(Object.values(res.data as ErrorResponse)[0])
      }
    })
    .catch((err) => {
      if (onProblem) {
        onProblem(err.toString())
      } else {
        console.error(err.stack)
      }
    })
}

/** Asynchronously request an OTP code (protected route)
 * @param userToken: this user's session access token stored in AsyncStorage
 * @param onSuccess: a function implement side effects (i.e. navigation stuffs) in case of success
 * @param onProblem: a function takes returned error message and display it
 * @param customerPhone: customer's phone number
 */
const asyncGetOtp = (userToken: string) => (
  onSuccess: (receivedOtpCode: string) => void,
  onProblem: (errorMessage: string) => void,
) => (customerPhone: string) => {
  return api
    .get<OtpOkResponse, ErrorResponse>(
      '/otp',
      { phone: customerPhone },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    )
    .then((res) => {
      if (!res.problem) {
        // implement `onSuccess` callback with the received OTP code
        onSuccess(res.data?.otp_code as string)
      } else {
        // implement `onProblem` callback with the received error message
        onProblem(Object.values(res.data as ErrorResponse)[0])
      }
    })
    .catch((err) => {
      onProblem(err.toString())
      console.error(err.stack)
    })
}

/** Asynchronously request customer's credit score (protected route)
 * @param userToken: this user's session access token stored in AsyncStorage
 * @param onSuccess: a function implement side effects
 *                   (i.e. validate, navigation stuffs, etc.) in case of success
 * @param onProblem: a function takes returned error message and display it
 * @param customerPhone: customer's phone number
 */
const asyncGetCrescore = (userToken: string) => (
  onSuccess: (receivedScore: string) => void,
  onProblem: (errorMessage: string) => void,
) => (customerPhone: string) => {
  return api
    .get<ScoreOkResponse, ErrorResponse>(
      '/crescore',
      { phone: customerPhone },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    )
    .then((res) => {
      if (!res.problem) {
        // implement `onSuccess` callback with the received credit score string
        onSuccess(res.data?.score as string)
      } else {
        // implement `onProblem` callback with the received error message
        onProblem(Object.values(res.data as ErrorResponse)[0])
      }
    })
    .catch((err) => {
      onProblem(err.toString())
      console.error(err.stack)
    })
}

/** Asynchronously request current user's profile (protected route)
 * @param userToken: this user's session access token stored in AsyncStorage
 * @param onSuccess: a function implement side effects
 *                   (i.e. persist data, navigation stuffs, etc.) in case of success
 * @param onProblem: a function takes returned error message and display it
 */
const asyncGetUserProfile = (userToken: string) => (
  onSuccess: (receivedProfile: ProfileOkResponse) => void,
  onProblem: (errorMessage: string) => void,
) => {
  return api
    .get<ProfileOkResponse, ErrorResponse>(
      '/profile',
      {},
      // server will decode user token to get user's phone number,
      // which is used as login id
      { headers: { Authorization: `Bearer ${userToken}` } },
    )
    .then((res) => {
      if (!res.problem) {
        // implement `onSuccess` callback with the received profile object
        onSuccess(res.data as ProfileOkResponse)
      } else {
        // implement `onProblem` callback with the received error message
        onProblem(Object.values(res.data as ErrorResponse)[0])
      }
    })
    .catch((err) => {
      onProblem(err.toString())
      console.error(err.stack)
    })
}

export {
  asyncLogin,
  asyncLogout,
  asyncRegister,
  asyncGetOtp,
  asyncGetCrescore,
  asyncGetUserProfile,
}
