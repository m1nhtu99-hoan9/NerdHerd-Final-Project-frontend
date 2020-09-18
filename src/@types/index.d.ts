/*
  Transient type definitions go here
*/

/** a hack declaring empty type module to avoid type warning regarding
 * `sync-storage`, which actually use Flow instead of TypeScript
 */
declare module 'sync-storage'

/** a hack declaring empty type module to avoid type warning
 *  regarding `rn-faded-scrollview`
 */
declare module 'rn-faded-scrollview'

/** a hack declaring empty type module to avoid type warning
 *  regarding `react-native-speedometer`
 */
declare module 'react-native-speedometer'

/** a hack declaring empty type module to avoid type warning
 *  regarding `Base64`
 */
declare module 'Base64'

/** a hack declaring empty type module to avoid type warning
 *  regarding `react-native-masked-loader`
 */
declare module 'react-native-masked-loader'

declare module 'expo-blur'

/** HTTP Response schemas 
 @reference https://app.swaggerhub.com/apis-docs/minhtu-thomas-hoang9/nerdherd-crescorex-api/
 */

type PhoneNum = string

type ErrorResponse = { message: string } | { msg: string }
type LoginOkResponse = { jwt: string }
type RegisterOkResponse = { db_user_id: string }
type OtpOkResponse = { otp_code: string }
type ScoreOkResponse = { score: string }
type SearchResultResponse = { customer_phone: string; credit_score: string }
type SearchResult = {
  phone?: PhoneNum
  score?: number
}
type ProfileOkResponse = {
  user_id?: string
  phone: string
  full_name?: string
  bank_id: string
  email: string
  search_history?: Array<SearchResult>
}


type SignInFormFields = {
  phoneNum: string
  password: string
}

type RegisterForm = {
  full_name: string
  phone: string
  email: string
  password: string
  license_key: string
  role: string
}
