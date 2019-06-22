import { ADD_MEMO, DELETE_MEMO, LOAD_MEMOS, DELETE_MEMOS } from "./actionTypes"
import { Memo } from "../../model/Memo"
import { memoStorage } from "../../api/MemoStorage"
import moment from "moment"


const sortByDateDescending = (memoList: Memo[]) => {
    return memoList.sort((a, b) => {
        return a.creationDate - b.creationDate
    })
}
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
            creationDate: moment().valueOf()
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
        const memoList = sortByDateDescending(await memoStorage.getMemoList())
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

export const removeMemos = (ids: string[]) => {
    return async dispatch => {
        await memoStorage.deleteMemos(ids)
        const newMemos = sortByDateDescending(await memoStorage.getMemoList())
        dispatch({
            type: DELETE_MEMOS,
            memoList: newMemos
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