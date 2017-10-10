// @flow

import reducer from './reducer'
import {
  fetchData,
  getDataSuccess,
  getDataFailure,
  fetchNeoFeedEpic
} from './actions'
import {
  FETCHING_DATA,
  FETCHING_DATA_FAILURE,
  FETCHING_DATA_SUCCESS
} from './types'

export type { Neo } from './types'

export {
  fetchData,
  getDataSuccess,
  getDataFailure,
  fetchNeoFeedEpic,
  FETCHING_DATA,
  FETCHING_DATA_FAILURE,
  FETCHING_DATA_SUCCESS
}

export default reducer
