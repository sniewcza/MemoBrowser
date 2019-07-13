import React from "react"
import { TextInput, StyleSheet, KeyboardAvoidingView } from "react-native"

interface Props {
    visible: boolean;
    text: string;
    onTextChange: (text: string) => any;
    onAccept: () => any;
}

export class MemoDescriptionTextInput extends React.Component<Props> {
    render() {
        const { text, onAccept, onTextChange } = this.props
        return (
            <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
                <TextInput
                    style={styles.textInput}
                    autoFocus
                    value={text}
                    onBlur={onAccept}
                    placeholder={"Describe your memo series"}
                    placeholderTextColor={"black"}
                    onChangeText={onTextChange}
                    selectionColor={"black"}
                    textAlign={'center'}
                />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#9FA8DA",
        justifyContent: "center"
    },
    textInput: {
        fontSize: 16,
        backgroundColor: "#9FA8DA"
    },
    buttonsRow: {
        flexDirection: "row",
        opacity: 1,
        justifyContent: "space-evenly"
    }
})