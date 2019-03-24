import { createStore, combineReducers } from "redux"
import { memoReducer } from "./reducers/memoReducer"

const rootReducer = combineReducers({
    memos: memoReducer
})

export const store = createStore(rootReducer)