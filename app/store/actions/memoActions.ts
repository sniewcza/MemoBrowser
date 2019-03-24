import { ADD_MEMO, DELETE_MEMO } from "./actionTypes"
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

export const deleteMemo = (name: string) => {
    return {
        type: DELETE_MEMO,
        name
    }
}