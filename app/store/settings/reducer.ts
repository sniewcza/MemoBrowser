import { Reducer } from "redux"
import { SettingsActions, State } from "./types";


const defaultState: State = {
    settings: undefined
}

export const settingsReducer: Reducer<State, SettingsActions> = (state = defaultState, action) => {
    switch (action.type) {
        case "GET_SETTINGS":
            return {
                ...state,
                settings: action.settings
            }
        case "SET_SETTINGS":
            return {
                ...state,
                settings: action.settings
            }
        default:
            return state
    }
}