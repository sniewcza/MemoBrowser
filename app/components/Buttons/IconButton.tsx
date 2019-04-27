import React from "react"
import { TouchableNativeFeedback, View, ViewStyle, StyleProp } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

interface Props {
    iconName: string;
    iconSize: number;
    color: string
    onPress: () => any
    disabled?: boolean;
    style?: StyleProp<ViewStyle>
}

export class IconButton extends React.PureComponent<Props>{
    render() {
        const { onPress, disabled, style, iconName, iconSize, color } = this.props
        return (
            <TouchableNativeFeedback
                onPress={onPress}
                disabled={disabled}
                background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                useForeground
            >
                <View style={style}>
                    <Icon name={iconName} size={iconSize} color={color} />
                </View>
            </TouchableNativeFeedback>
        )
    }
}