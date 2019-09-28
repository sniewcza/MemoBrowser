import { MemoActions, State } from "./types"
import { Reducer } from "redux";


const defaultState: State = {
    memos: undefined
}

export const memoReducer: Reducer<typeof defaultState, MemoActions> = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_MEMO":
            return {
                memos: [...state.memos!, action.memo]
            }
        case "DELETE_MEMO":
            const memos = state.memos.filter(memo => memo.id !== action.memoId)
            return {
                memos
            }
        case "LOAD_MEMOS":
            return {
                memos: action.memoList
            }
        default:
            return state
    }
}