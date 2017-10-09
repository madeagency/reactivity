// @flow

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/catch'
import { apiFetch } from '../../helpers/Api'

import {
  FETCHING_DATA,
  FETCHING_DATA_FAILURE,
  FETCHING_DATA_SUCCESS
} from './types'
import type { Neo } from './types'

export type fetchDataAction = {
  type: typeof FETCHING_DATA,
  payload: { startDate: string, endDate: string }
}

export type getDataSuccessAction = {
  type: typeof FETCHING_DATA_SUCCESS,
  payload: { [key: string]: Array<Neo> }
}

export type getDataFailureAction = {
  type: typeof FETCHING_DATA_FAILURE,
  payload: string
}

export function fetchData(startDate: string, endDate: string): fetchDataAction {
  return {
    type: FETCHING_DATA,
    payload: {
      startDate,
      endDate
    }
  }
}

export function getDataSuccess(data: {
  near_earth_objects: { [key: string]: Array<Neo> }
}): getDataSuccessAction {
  return {
    type: FETCHING_DATA_SUCCESS,
    payload: data.near_earth_objects
  }
}

export function getDataFailure(error: string): getDataFailureAction {
  return {
    type: FETCHING_DATA_FAILURE,
    payload: error
  }
}

export const fetchNeoFeedEpic = action$ =>
  action$
    .ofType(FETCHING_DATA)
    .map(action => ({
      startDate: action.payload.startDate,
      endDate: action.payload.endDate
    }))
    .mergeMap(({ startDate, endDate }) =>
      Observable.from(
        apiFetch(`/feed?start_date=${startDate}&end_date=${endDate}`)
      )
        .map(result => getDataSuccess(result))
        .takeUntil(action$.ofType(FETCHING_DATA))
        .catch(error => Observable.of(getDataFailure(error)))
    )
