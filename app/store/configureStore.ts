import { createStore, combineReducers, applyMiddleware } from "redux"
import { memoReducer } from "./memo"
import { settingsReducer } from "./settings"
import Thunk from "redux-thunk"

const rootReducer = combineReducers({
    memos: memoReducer,
    settings: settingsReducer
})

const initialState: AppState = {
    memos: {
        memos: undefined
    },
    settings: {
        settings: undefined
    }
}
export type AppState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, initialState, applyMiddleware(Thunk))