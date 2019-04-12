import React from "react"
import { View, TextInput, StyleSheet } from "react-native"


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
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    autoFocus
                    value={text}
                    onBlur={onAccept}
                    placeholder={"Describe your memo series"}
                    placeholderTextColor={"red"}
                    onChangeText={onTextChange}
                    selectionColor={"red"}
                    textAlign={'center'}>
                </TextInput>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center"
    },
    textInput: {
        color: "red",
        backgroundColor: "transparent"
    },
    buttonsRow: {
        flexDirection: "row",
        opacity: 1,
        justifyContent: "space-evenly"
    }
})