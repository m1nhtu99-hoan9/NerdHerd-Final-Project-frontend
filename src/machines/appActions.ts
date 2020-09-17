import { assign, EventObject } from 'xstate'
import {
  AppMachineContext,
  AppMachineEvent,
  AppActionObject,
  TUserProfile,
} from '../@types/machines'

import { map, prepend } from 'ramda'

/**@tutorial should use `@ts-ignore` for this to take advantage of JS' flexibility */
const resetContext = assign<AppMachineContext, AppMachineEvent>({
  searchHistory: [] as Array<SearchResult>,
  token: '',
  userProfile: {},
})

/** extract message from non-200's response and update context accordingly */
const persistUnsuccRespMessage = assign<AppMachineContext, AppMachineEvent>({
  lastResponse: (_, event) => {
    const statusCode = event.data.status
    // for rejected promises, `event.data` returns error message
    const respData = event.data.data

    return {
      statusCode,
      lastErrorMessage:
        statusCode >= 500
          ? 'Internal server error'
          : (Object.values(respData)[0] as string),
    }
  },
})

/** extract error message from rejected promise and update context accordingly */
const persistRejectedMessage = assign<AppMachineContext, AppMachineEvent>({
  // @ts-ignore; for rejected promises, `event.data` returns error message
  lastResponse: (ctx, event) => {
    return { ...ctx.lastResponse, lastErrorMessage: event.data }
  },
})

/** remove currently stored OTP */
const resetOtp = assign<AppMachineContext, AppMachineEvent>({
  otp: '',
})

/** prepend received search result to search history in context */
const addSearchResultToHistory = assign<AppMachineContext, AppMachineEvent>({
  searchHistory: (ctx, event) => [
    event.data.data,
    ...(ctx.searchHistory as Array<SearchResult>),
  ],
})

interface TAssignHandler {
  [key: string]: (ctx: AppMachineContext, event: AppMachineEvent) => unknown
}

const assignHandler: TAssignHandler = {
  /** assign handler for search history context on logged in */
  SearchHistory: (_, event) => {
    const _transformSearchedCustItem = function (
      item: SearchResultResponse,
    ): SearchResult {
      /* round function 
      щ（ﾟДﾟщ）because JS' default round method is stupid AF */
      const round = (num: Number) => (places: Number) => {
        // @ts-ignore; because TS too dump to understand the brilliance of this
        return +(Math.round(num + 'e+' + places) + 'e-' + places)
      }

      return {
        phone: Object.values(item)[1],
        // @ts-ignore
        score: (round(parseFloat(Object.values(item)[0]))(2) * 100) | 0,
      }
    }

    /* convert received Array<SearchResultResponse> to Array<SearchResult> */
    return map(_transformSearchedCustItem)(
      // `event.data` returns an object complying to interface `ApiOkResponse`
      event.data.data.search_history,
    )
  },
  /** update user profile context on logged in */
  UserProfile: (_, event): TUserProfile => {
    const respData = event.data.data as ProfileOkResponse

    return {
      bankId: respData.bank_id,
      email: respData.email,
      fullName: respData.full_name,
      phone: respData.phone,
      userId: respData.user_id,
    }
  },
  /** update last response context after a 200's response */
  LastResponse: (_, event) => {
    return { statusCode: event.data.status, lastErrorMessage: '' }
  },
}

export {
  resetContext,
  persistUnsuccRespMessage,
  persistRejectedMessage,
  assignHandler,
  resetOtp,
  addSearchResultToHistory,
}
