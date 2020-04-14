import { Action } from "redux";
import { Memo } from "../../model"

export interface State {
    memos: Memo[] | undefined
}

export interface AddMemo extends Action<"ADD_MEMO"> {
    memo: Memo
}

export interface DeleteMemo extends Action<"DELETE_MEMO"> {
    memoId: string
}

export interface LoadMemos extends Action<"LOAD_MEMOS"> {
    memoList: Memo[]
}

export type MemoActions = AddMemo | DeleteMemo | LoadMemos 