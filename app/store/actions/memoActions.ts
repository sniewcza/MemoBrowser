import { ADD_MEMO, DELETE_MEMO, LOAD_MEMOS } from "./actionTypes"
import { memo } from "../reducers/memoReducer"
import { createMemoSnapshoot } from "../../api/MemoStorage"
import { getMemoList, deleteMemo } from "../../api/MemoStorage"

export const addMemo = (photoList: any[]) => {
    return async dispatch => {
        const newMemo: memo = {
            name: Math.random().toString(),
            photos: photoList
        }
        await createMemoSnapshoot(newMemo.name, newMemo.photos)
        dispatch({
            type: ADD_MEMO,
            newMemo
        })
    }
}

export const loadMemos = () => {
    return async dispatch => {
        const memoList = await getMemoList();
        dispatch({
            type: LOAD_MEMOS,
            memoList
        })
    }
}

export const removeMemo = (name: string) => {
    return async dispatch => {
        await deleteMemo(name)
        dispatch({
            type: DELETE_MEMO,
            name
        })
    }
}