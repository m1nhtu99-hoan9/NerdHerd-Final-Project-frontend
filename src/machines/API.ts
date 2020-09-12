import { create, ApiResponse } from 'apisauce'
import { btoa as b64_encode } from 'Base64'

const BASE_URI = 'https://nerdherd-crescorex.herokuapp.com/'
const api = create({
  baseURL: BASE_URI,
})

/** to authenticate and get back JWT access token */
const asyncLogin = function (phoneNum: string, rawPassword: string) {
  const decodedCreds = b64_encode(`${phoneNum}:${rawPassword}`)
  console.log(`Decoded string: ${decodedCreds}`)
  return api.get(
    '/auth/login',
    {},
    {
      headers: {
        'Authorization': `Basic ${decodedCreds}`
      }
    },
  )

  /* Resolved object: { config: {}, data: {}, problem: string, status: number } */
}

export { asyncLogin }
