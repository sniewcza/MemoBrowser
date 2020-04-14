import React from "react"
import { TouchableWithoutFeedback, View, StyleProp, ViewStyle, StyleSheet } from "react-native"

interface Props {
    onPress: () => any;
    style?: StyleProp<ViewStyle>
}

export default class MemoListItemSubmenuButton extends React.PureComponent<Props> {
    render() {
        const { onPress, style } = this.props
        return (
            < TouchableWithoutFeedback onPress={onPress} >
                <View style={[styles.button, style]}>
                    {this.props.children}
                </View>
            </ TouchableWithoutFeedback >
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth:StyleSheet.hairlineWidth
    }
})