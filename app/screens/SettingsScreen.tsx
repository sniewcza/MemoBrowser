import React from "react"
import { SafeAreaView, StyleSheet, View, Text, Switch } from "react-native"
import { AppState } from "../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Settings } from "../model";
import { setSettings } from "../store/settings"
import { connect } from "react-redux";

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class SettingsView extends React.Component<Props> {
    handleChange = (value: boolean) => {
        const newSettings: Settings = {
            memoListSecured: value
        }
        this.props.setSettings(newSettings)
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.settingRow}>
                    <Text>Secure memos with device lock</Text>
                    <Switch value={this.props.memoListSecured} onValueChange={this.handleChange} style={styles.switch}></Switch>
                </View>
            </SafeAreaView >
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    memoListSecured: state.settings.memoListSecured
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
    switch: {
        marginLeft: "auto",
    }
})