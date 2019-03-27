import { AsyncStorage } from "react-native"

const STORE_NAME = '@MemoStore'
export const createMemoSnapshoot = async (name: string, photos: any[]) => {
    const dataObject = JSON.stringify(photos)
    await AsyncStorage.setItem(`${STORE_NAME}:${name}`, dataObject)
}

export const getMemoList = async () => {
    const keys = await AsyncStorage.getAllKeys();
    let memoList = [];
    for (let key of keys) {
        console.log(key);
        const JsonData = await AsyncStorage.getItem(key)
        const dataObject = JSON.parse(JsonData);
        memoList.push({ name: key.replace(`${STORE_NAME}:`, ""), photos: dataObject })
    }
    return memoList
}