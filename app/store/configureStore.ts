import { createStore, combineReducers, applyMiddleware } from "redux"
import { memoReducer } from "./reducers/memoReducer"
import Thunk from "redux-thunk"

const rootReducer = combineReducers({
    memos: memoReducer
})

export const store = createStore(rootReducer, applyMiddleware(Thunk))