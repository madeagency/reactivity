import 'rxjs'
import { Observable } from 'rxjs/Observable'
import { ajax } from 'rxjs/observable/dom/ajax'

export const FETCHING_DATA = 'FETCHING_DATA'
export const FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS'
export const FETCHING_DATA_FAILURE = 'FETCHING_DATA_FAILURE'

const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false,
  label: 'GET NOW!!'
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      }
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}

export function fetchData() {
  return {
    type: FETCHING_DATA
  }
}

export function getDataSuccess(data) {
  return {
    type: FETCHING_DATA_SUCCESS,
    data: data.people
  }
}

export function getDataFailure(error) {
  return {
    type: FETCHING_DATA_FAILURE,
    errorMessage: error
  }
}

export const fetchUserEpic = action$ =>
  action$.ofType(FETCHING_DATA)
    .mergeMap(() =>
      ajax.getJSON('/api/people')
        .map(response => getDataSuccess(response))
        .catch(error => Observable.of(getDataFailure(error)))
    )
