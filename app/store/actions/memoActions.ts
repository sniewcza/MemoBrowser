import { ADD_MEMO, DELETE_MEMO, LOAD_MEMOS } from "./actionTypes"
import { Memo } from "../../model/Memo"
import { memoStorage } from "../../api/MemoStorage"
import moment from "moment"

export const addMemo = (description: string, photoList: any[]) => {
    return async dispatch => {
        let name = description.trim()
        if (name.length === 0) {
            name = ""
        }
        const newMemo: Memo = {
            name,
            id: Math.random().toString(),
            photos: photoList,
            creationDate: moment().format("DD-MM-YYYY")
        }
        await memoStorage.createMemoSnapshoot(newMemo)
        dispatch({
            type: ADD_MEMO,
            newMemo
        })
    }
}

export const loadMemos = () => {
    return async dispatch => {
        const memoList = await memoStorage.getMemoList();
        dispatch({
            type: LOAD_MEMOS,
            memoList
        })
    }
}

export const removeMemo = (id: string) => {
    return async dispatch => {
        await memoStorage.deleteMemo(id)
        dispatch({
            type: DELETE_MEMO,
            id
        })
    }
}

export const renameMemo = (id: string, newName: string) => {
    return async (dispatch, getState) => {
        const renamedMemo: Memo = await memoStorage.renameMemo(id, newName)
        const memoList: Memo[] = getState().memos.memos
        const index = memoList.findIndex(item => item.id === renamedMemo.id)
        const newList = [...memoList.slice(0, index), renamedMemo, ...memoList.slice(index + 1)]
        dispatch({
            type: LOAD_MEMOS,
            memoList: newList
        })
    }
}