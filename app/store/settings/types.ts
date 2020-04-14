import { Action } from "redux"
import { Settings } from "../../model"


export interface State {
    settings: Settings | undefined
}
export interface GetSettings extends Action<"GET_SETTINGS"> {
    settings: Settings
}

export interface SetSettings extends Action<"SET_SETTINGS"> {
    settings: Settings
}

export type SettingsActions = GetSettings | SetSettings