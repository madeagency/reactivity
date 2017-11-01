// @flow

import reducer from './reducer'

export {
  fetchData,
  getDataSuccess,
  getDataFailure,
  fetchNeoFeedEpic
} from './actions'

export {
  FETCHING_DATA,
  FETCHING_DATA_FAILURE,
  FETCHING_DATA_SUCCESS
} from './types'

export type { Neo } from './types'

export default reducer
