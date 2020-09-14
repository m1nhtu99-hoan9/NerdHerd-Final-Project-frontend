import { createContext } from 'react'
import { assign, EventObject } from 'xstate'
import {
  AppMachineContext,
  AppMachineEvent,
  AppActionObject,
  TUserProfile,
} from '../@types/machines'

type TEntryActions = { [key: string]: AppActionObject }

/**@tutorial should use `@ts-ignore` for this to take advantage of JS' flexibility */
const resetContext = assign<AppMachineContext, AppMachineEvent>({
  searchHistory: [] as Array<SearchResult>,
  token: '',
  userProfile: {},
})

const persistRejectedMessage = assign<AppMachineContext, AppMachineEvent>({
  // for rejected promises, `event.data` returns error message
  lastResponse: (ctx, event) => {
    return { ...ctx.lastResponse, lastErrorMessage: event.data }
  },
})

export { resetContext, persistRejectedMessage }
