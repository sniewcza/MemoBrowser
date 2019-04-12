import { AsyncStorage } from "react-native"
import { Memo } from "../model/Memo"

const STORE_NAME = '@MemoStore'

export const createMemoSnapshoot = async (memo: Memo) => {
    const dataObject = JSON.stringify(memo)
    await AsyncStorage.setItem(`${STORE_NAME}:${memo.id}`, dataObject)
}

export const getMemoList = async () => {
    const keys = await AsyncStorage.getAllKeys();
    let memoList = [];
    for (let key of keys) {
        const JsonData = await AsyncStorage.getItem(key)
        const memo: Memo = JSON.parse(JsonData);
        memoList.push(memo)
    }
    return memoList
}

export const deleteMemo = async (id: string) => {
    await AsyncStorage.removeItem(`${STORE_NAME}:${id}`)
}