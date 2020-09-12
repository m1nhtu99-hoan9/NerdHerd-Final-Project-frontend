import { assign } from 'xstate'
import { AppMachineContext, AppMachineEvent, AppActionObject } from '../@types/machines'

type EntryActionOptions = 'resetContext'

const entryActions = function (name: EntryActionOptions): AppActionObject {
  switch (name) {
    case 'resetContext':
      return assign<AppMachineContext, AppMachineEvent>({
        searchHistory: [],
        token: '',
        userProfile: {},
      })
  }
}

export { entryActions }
