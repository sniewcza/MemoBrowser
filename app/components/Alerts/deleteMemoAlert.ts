import { Alert } from "react-native"

export const deleteMemoAlert = (handleYesPress: () => any) => {
    Alert.alert("", "Delete this memo?", [{ text: "No", }, { text: "Yes", onPress: handleYesPress }], { cancelable: true })
}