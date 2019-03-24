import { ADD_MEMO } from "./actionTypes"
import { memo } from "../reducers/memoReducer"

export const addMemo = (photoList: any[]) => {
    const newMemo: memo = {
        name: Math.random().toString(),
        photos: photoList
    }
    return {
        type: ADD_MEMO,
        newMemo
    }
}