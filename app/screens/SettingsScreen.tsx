import React from "react"
import { SafeAreaView, StyleSheet, View, Text, Switch } from "react-native"
import { AppState } from "../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Settings } from "../model";
import { setSettings } from "../store/settings"
import { connect } from "react-redux";
import * as LocalAuthService from "../api/LocalAuthService";
import { appStrings } from "../config/Strings";

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

interface State {
    authorizationPossible: boolean | null
}

class SettingsView extends React.Component<Props, State> {
    state = {
        authorizationPossible: null
    }
    async componentDidMount() {
        this.setState({
            authorizationPossible: await LocalAuthService.isDeviceSecured()
        })
    }
    handleChange = (value: boolean) => {
        const newSettings: Settings = {
            memoListSecured: value
        }
        this.props.setSettings(newSettings)
    }
    render() {
        const { authorizationPossible } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <View style={[styles.settingRow, authorizationPossible ? styles.active : styles.inactive]}>
                    <Text>{appStrings.secureMemosSettingLabel}</Text>
                    <Switch disabled={!authorizationPossible} value={this.props.memoListSecured} onValueChange={this.handleChange} style={styles.switch}></Switch>
                </View>
            </SafeAreaView >
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    memoListSecured: state.settings.settings!.memoListSecured
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, null, AnyAction>) => ({
    setSettings: (settings: Settings) => dispatch(setSettings(settings))
})

export const SettingsScreen = connect(mapStateToProps, mapDispatchToProps)(SettingsView)

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