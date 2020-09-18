import { assign, EventObject } from 'xstate'
import {
  AppMachineContext,
  AppMachineEvent,
  AppActionObject,
  TUserProfile,
} from '../@types/machines'

import { map, prepend } from 'ramda'
import { preciseRound as round } from '../utils'

const _transformSearchedCustItem = function (
  item: SearchResultResponse | SearchResult,
) {
  const raw_score =
    (item as SearchResultResponse).credit_score || (item as SearchResult).score

  return {
    phone:
      (item as SearchResultResponse).customer_phone ||
      (item as SearchResult).phone,
    // @ts-ignore
    score: round(parseFloat(raw_score, 2) * 100),
  }
}

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
          : respData.msg || respData.message,
    }
  },
})

/** extract error message from rejected promise and update context accordingly */
const persistRejectedMessage = assign<AppMachineContext, AppMachineEvent>({
  // @ts-ignore; for rejected promises, `event.data` returns error message
  lastResponse: (ctx, event) => {
    const resp = event.data
    return {
      statusCode: resp.status,
      lastErrorMessage: resp.data.msg || resp.data.message,
    }
  },
})

/** remove currently stored OTP */
const resetOtp = assign<AppMachineContext, AppMachineEvent>({
  otp: '',
})

/** prepend received search result to search history in context */
const addSearchResultToHistory = assign<AppMachineContext, AppMachineEvent>({
  searchHistory: function (ctx, event) {
    console.log(event.data)

    return [
      // `event.data.data` has type of `SearchResult`
      _transformSearchedCustItem(event.data.data),
      ...(ctx.searchHistory as Array<SearchResult>),
    ]
  },
})

interface TAssignHandler {
  [key: string]: (ctx: AppMachineContext, event: AppMachineEvent) => unknown
}

const assignHandler: TAssignHandler = {
  /** assign handler for search history context on logged in */
  SearchHistory: (_, event) => {
    /* convert received Array<SearchResultResponse> to Array<SearchResult> */
    // `event.data` returns an object complying to interface `ApiOkResponse`
    return event.data.data.search_history.map(_transformSearchedCustItem)
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
