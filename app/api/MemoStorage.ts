import AsyncStorage from "@react-native-community/async-storage"
import { Memo } from "../model/Iterfaces"

const STORE_NAME = '@MemoStore'

class MemoStorage {

    createMemoSnapshoot = async (memo: Memo) => {
        const dataObject = JSON.stringify(memo)
        await AsyncStorage.setItem(`${STORE_NAME}:${memo.id}`, dataObject)
    }

    getMemoList = async () => {
        const keys = await AsyncStorage.getAllKeys();
        let memoList = [];
        for (let key of keys) {
            const JsonData = await AsyncStorage.getItem(key)
            const memo: Memo = JSON.parse(JsonData);
            memoList.push(memo)
        }
        return memoList
    }

    deleteMemo = async (id: string) => {
        await AsyncStorage.removeItem(`${STORE_NAME}:${id}`)
    }

    deleteMemos = async (ids: string[]) => {
        const keys = ids.map(id => `${STORE_NAME}:${id}`)
        await AsyncStorage.multiRemove(keys)
    }

    renameMemo = async (id: string, newName: string) => {
        const key = `${STORE_NAME}:${id}`
        const memo: Memo = JSON.parse(await AsyncStorage.getItem(key))
        if (memo) {
            memo.name = newName
            const dataObject = JSON.stringify(memo)
            await AsyncStorage.setItem(key, dataObject)
        }
        return memo
    }
}

export const memoStorage = new MemoStorage()