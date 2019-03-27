import { ADD_MEMO, DELETE_MEMO, LOAD_MEMOS } from "../actions/actionTypes"

export interface memo {
    name: string
    photos: any[]
}
const defaultState = {
    memos: Array<memo>()
}
export const memoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_MEMO:
            return {
                memos: [...state.memos, action.newMemo]
            }
        case DELETE_MEMO:
            const memos = state.memos.filter(memo => memo.name !== action.name)
            return {
                memos
            }
        case LOAD_MEMOS:
            return {
                memos: action.memoList
            }
        default:
            return state
    }
}