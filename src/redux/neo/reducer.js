// @flow

import {
  FETCHING_DATA,
  FETCHING_DATA_FAILURE,
  FETCHING_DATA_SUCCESS
} from './types'

import type { Neo } from './types'
import type { Actions } from './actions'

type State = {
  +startDate: string,
  +endDate: string,
  +data: { [key: string]: Array<Neo> },
  +fetched: boolean,
  +fetching: boolean,
  +error: boolean
}

const initialState: State = {
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10),
  data: {},
  fetched: false,
  fetching: false,
  error: false
}

export default function neo(
  state: State = initialState,
  action: Actions
): State {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        fetching: true
      }
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload
      }
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        fetched: false,
        error: true
      }
    default:
      return state
  }
}
