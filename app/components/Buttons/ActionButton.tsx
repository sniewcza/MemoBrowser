import React from 'react';
import Icon from "react-native-vector-icons/Ionicons"
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native'
import { Color } from "../../config/ColorTheme"

interface Props {
    onPress?: () => any,
    backgroundColor?: string
}
export class ActionButton extends React.PureComponent<Props> {
    render() {
        const { onPress, backgroundColor } = this.props
        return (
            <TouchableWithoutFeedback onPress={onPress} >
                <View style={{ ...styles.actionButton, backgroundColor: backgroundColor }}>
                    <Icon name="md-add" size={35} color={Color.onSecondary} />
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    actionButton: {
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        width: 50,
        height: 50,
        elevation:6
    }
})