import { Alert } from "react-native"
import { appStrings } from "../../config/Strings"

export const deleteMemoAlert = (handleYesPress: () => any) => {
    Alert.alert("", appStrings.memoDeletionPrompt, [{ text: "No", }, { text: "Yes", onPress: handleYesPress }], { cancelable: true })
}