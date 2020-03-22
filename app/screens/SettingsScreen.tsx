import React, { FC, useState, useEffect } from "react"
import { SafeAreaView, StyleSheet, View, Text, Switch } from "react-native"
import { AppState } from "../store";
import { Settings } from "../model";
import { setSettings } from "../store/settings"
import { useDispatch, useSelector } from "react-redux";
import * as LocalAuthService from "../api/LocalAuthService";
import { appStrings } from "../config/Strings";

export const SettingsScreen: FC = props => {
    const [authorizationPossible, setAuthorizationPossible] = useState<boolean | undefined>(undefined)
    const [switchValue, setSwitchValue] = useState(false)
    const settings = useSelector((state: AppState) => state.settings.settings)
    const dispatch = useDispatch()

    useEffect(() => {
        setSwitchValue(settings!.memoListSecured)
        LocalAuthService.isDeviceSecured()
            .then(value => setAuthorizationPossible(value))
    }, [])

    const handleChange = (value: boolean) => {
        const newSettings: Settings = {
            memoListSecured: value
        }
        setSwitchValue(value)
        dispatch(setSettings(newSettings))
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.settingRow, authorizationPossible ? styles.active : styles.inactive]}>
                <Text>{appStrings.secureMemosSettingLabel}</Text>
                <Switch
                    disabled={!authorizationPossible}
                    value={switchValue}
                    onValueChange={handleChange}
                    style={styles.switch} />
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    settingRow: {
        padding: 20,
        alignItems: "center",
        flexDirection: "row",
        borderColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    active: {
        opacity: 1
    },
    inactive: {
        opacity: 0.4
    },
    switch: {
        marginLeft: "auto",
    }
})