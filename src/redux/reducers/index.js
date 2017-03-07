import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import users, { fetchUserEpic } from './users'

export const rootEpic = combineEpics(
  fetchUserEpic
)

export default combineReducers({
  users
})
