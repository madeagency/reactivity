import { combineReducers } from "redux"
import { combineEpics } from "redux-observable"
import { reducer as formReducer } from "redux-form"
import neo, { fetchNeoFeedEpic } from "./neo"

export const rootEpic = combineEpics(fetchNeoFeedEpic)

export default combineReducers({
  neo,
  form: formReducer
})
