import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/catch'
import { apiFetch } from '../../helpers/Api'

export const FETCHING_DATA = 'nasa/neo/FETCHING_DATA'
export const FETCHING_DATA_SUCCESS = 'nasa/neo/FETCHING_DATA_SUCCESS'
export const FETCHING_DATA_FAILURE = 'nasa/neo/FETCHING_DATA_FAILURE'

const initialState = {
  date: new Date().toISOString().slice(0, 10),
  data: [],
  fetched: false,
  fetching: false,
  error: false
}

export default function neo(state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
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
        error: true,
        data: action.payload
      }
    default:
      return state
  }
}

export function fetchData(startDate, endDate) {
  return {
    type: FETCHING_DATA,
    payload: {
      startDate,
      endDate
    }
  }
}

export function getDataSuccess(data) {
  return {
    type: FETCHING_DATA_SUCCESS,
    payload: data.near_earth_objects[initialState.date]
  }
}

export function getDataFailure(error) {
  return {
    type: FETCHING_DATA_FAILURE,
    payload: error
  }
}

export const fetchNeoFeedEpic = action$ =>
  action$.ofType(FETCHING_DATA)
    .map(action => ({
      startDate: action.payload.startDate,
      endDate: action.payload.endDate
    }))
    .mergeMap(() =>
      Observable.from(apiFetch(`/feed?start_date=${initialState.date}&end_date=${initialState.date}`))
        .map(result => getDataSuccess(result))
        .takeUntil(action$.ofType(FETCHING_DATA))
        .catch(error => Observable.of(getDataFailure(error))))
