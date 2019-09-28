import AsyncStorage from "@react-native-community/async-storage"
import { Settings, defaultSettings } from "../model"

const STORE_NAME = '@Settings';

class SettingsStorage {
    setSettings = (settings: Settings) => {
        return AsyncStorage.setItem(STORE_NAME, JSON.stringify(settings))
    }

    getSettings = async (): Promise<Settings> => {
        const item = await AsyncStorage.getItem(STORE_NAME)
        if (item !== null) {
            return JSON.parse(item)
        }
        return defaultSettings
    }
}


export const SettingStorage = new SettingsStorage()