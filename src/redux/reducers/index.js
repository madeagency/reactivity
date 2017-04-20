import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import { reducer as formReducer } from 'redux-form'
import users, { fetchUserEpic } from './users'

export const rootEpic = combineEpics(
  fetchUserEpic
)

export default combineReducers({
  users,
  form: formReducer
})
