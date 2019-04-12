import { ADD_MEMO, DELETE_MEMO, LOAD_MEMOS } from "./actionTypes"
import { Memo } from "../../model/Memo"
import { createMemoSnapshoot } from "../../api/MemoStorage"
import { getMemoList, deleteMemo } from "../../api/MemoStorage"


export const addMemo = (description: string, photoList: any[]) => {
    return async dispatch => {
        let name = description.trim()
        if (name.length === 0) {
            name = Date.now().toString()
        }
        const newMemo: Memo = {
            name,
            id: Math.random().toString(),
            photos: photoList
        }
        await createMemoSnapshoot(newMemo)
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

export const removeMemo = (id: string) => {
    return async dispatch => {
        await deleteMemo(id)
        dispatch({
            type: DELETE_MEMO,
            id
        })
    }
}