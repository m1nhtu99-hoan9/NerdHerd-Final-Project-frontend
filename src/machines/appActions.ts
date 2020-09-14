import { assign } from 'xstate'
import {
  AppMachineContext,
  AppMachineEvent,
  AppActionObject,
} from '../@types/machines'

type TEntryActions = { [key: string]: AppActionObject }

const entryActions: TEntryActions = {
  resetContext: assign<AppMachineContext, AppMachineEvent>({
    searchHistory: [],
    token: '',
    userProfile: {},
  }),
}

export { entryActions }
