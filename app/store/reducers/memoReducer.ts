import { ADD_MEMO } from "../actions/actionTypes"

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
            console.log((action.newMemo));
            return {
                memos: [...state.memos, action.newMemo]
            }
        default:
            return state
    }
}