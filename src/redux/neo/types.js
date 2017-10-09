// @flow

export const FETCHING_DATA: string & 'nasa/neo/FETCHING_DATA' =
  'nasa/neo/FETCHING_DATA'
export const FETCHING_DATA_SUCCESS: string & 'nasa/neo/FETCHING_DATA_SUCCESS' =
  'nasa/neo/FETCHING_DATA_SUCCESS'
export const FETCHING_DATA_FAILURE: string & 'nasa/neo/FETCHING_DATA_FAILURE' =
  'nasa/neo/FETCHING_DATA_FAILURE'

export type Neo = { neo_reference_id: number | string, name: string }
