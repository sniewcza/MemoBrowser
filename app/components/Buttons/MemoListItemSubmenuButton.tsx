import React from "react"
import { TouchableWithoutFeedback, View } from "react-native"

interface Props {
    onPress: () => any;
    style: any[]
}

export default class MemoListItemSubmenuButton extends React.PureComponent<Props> {
    render() {
        const { onPress, style } = this.props
        return (
            < TouchableWithoutFeedback onPress={onPress} >
                <View style={[...style]}>
                    {this.props.children}
                </View>
            </ TouchableWithoutFeedback >
        )
    }
}