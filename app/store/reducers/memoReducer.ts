import { ADD_MEMO, DELETE_MEMO, LOAD_MEMOS, DELETE_MEMOS } from "../actions/actionTypes"
import { Memo } from "../../model/Iterfaces"

const defaultState = {
    memos: Array<Memo>()
}
export const memoReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case ADD_MEMO:
            return {
                memos: [...state.memos, action.newMemo]
            }
        case DELETE_MEMO:
            const memos = state.memos.filter(memo => memo.id !== action.id)
            return {
                memos
            }
        case DELETE_MEMOS:
            return {
                memos: action.memoList
            }
        case LOAD_MEMOS:
            return {
                memos: action.memoList
            }
        default:
            return state
    }
}