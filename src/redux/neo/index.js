// @flow

import reducer from './reducer'
import {
  fetchData,
  getDataSuccess,
  getDataFailure,
  fetchNeoFeedEpic
} from './actions'
import * as types from './types'

export { fetchData, getDataSuccess, getDataFailure, fetchNeoFeedEpic, types }

export default reducer
