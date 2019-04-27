import React from "react"
import { TouchableWithoutFeedback, View, StyleProp, ViewStyle } from "react-native"

interface Props {
    onPress: () => any;
    style?: StyleProp<ViewStyle>
}

export default class MemoListItemSubmenuButton extends React.PureComponent<Props> {
    render() {
        const { onPress, style } = this.props
        return (
            < TouchableWithoutFeedback onPress={onPress} >
                <View style={style}>
                    {this.props.children}
                </View>
            </ TouchableWithoutFeedback >
        )
    }
}