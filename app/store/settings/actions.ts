import { ActionCreator, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../configureStore";
import { GetSettings, SetSettings } from "./types";
import { SettingStorage } from "../../api/SettingsStorage"
import { Settings } from "../../model";

type AsyncActionCreator<a extends Action> = ActionCreator<ThunkAction<Promise<a>, AppState, null, a>>

export const getSettings: AsyncActionCreator<GetSettings> = () => {
    return async dispatch => {
        const settings = await SettingStorage.getSettings()
      //  console.log(settings);

        return dispatch({
            type: "GET_SETTINGS",
            settings
        })
    }
}

export const setSettings: AsyncActionCreator<SetSettings> = (settings: Settings) => {
    return async dispatch => {
        await SettingStorage.setSettings(settings)
        return dispatch({
            type: "SET_SETTINGS",
            settings
        })
    }
}