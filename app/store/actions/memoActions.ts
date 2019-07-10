import { AddMemo, LoadMemos, DeleteMemo, } from "./actionTypes"
import { Memo, Photo } from "../../model/Iterfaces"
import { memoStorage } from "../../api/MemoStorage"
import moment from "moment"
import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../configureStore";

const sortByDateDescending = (memoList: Memo[]) => {
    return memoList.sort((a, b) => {
        return a.creationDate - b.creationDate
    })
}

export const addMemo: ActionCreator<
    ThunkAction<
        Promise<AddMemo>,
        AppState,
        null,
        AddMemo
    >
> = (name: string, photoList: Photo[]) => {
    return async (dispatch) => {
        let memoName = name.trim()
        if (memoName.length === 0) {
            memoName = ""
        }
        const newMemo: Memo = {
            name: memoName,
            id: Math.random().toString(),
            photos: photoList,
            creationDate: moment().valueOf()
        }
        await memoStorage.createMemoSnapshoot(newMemo)
        return dispatch({
            type: "ADD_MEMO",
            memo: newMemo
        })
    }
}

export const loadMemos: ActionCreator<
    ThunkAction<
        Promise<LoadMemos>,
        AppState,
        null,
        LoadMemos>
> = () => {
    return async dispatch => {
        const memoList = sortByDateDescending(await memoStorage.getMemoList())
        return dispatch({
            type: "LOAD_MEMOS",
            memoList
        })
    }
}

export const removeMemo: ActionCreator<
    ThunkAction<
        Promise<DeleteMemo>,
        AppState,
        null,
        DeleteMemo
    >
> = (id: string) => {
    return async dispatch => {
        await memoStorage.deleteMemo(id)
        return dispatch({
            type: "DELETE_MEMO",
            memoId: id
        })
    }
}

export const removeMemos: ActionCreator<
    ThunkAction<
        Promise<LoadMemos>,
        AppState,
        null,
        LoadMemos
    >
> = (ids: string[]) => {
    return async dispatch => {
        await memoStorage.deleteMemos(ids)
        return dispatch(loadMemos())
    }
}

export const renameMemo: ActionCreator<
    ThunkAction<
        Promise<LoadMemos>,
        AppState,
        null,
        LoadMemos
    >
> = (id: string, newName: string) => {
    return async dispatch => {
        await memoStorage.renameMemo(id, newName)
        return dispatch(loadMemos())
    }
}