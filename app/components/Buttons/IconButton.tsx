import React, { FC } from "react"
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

export const IconButton: FC<Props> = (props) => {
    const { onPress, disabled, style, iconName, iconSize, color } = props
    return (
        <TouchableNativeFeedback
            hitSlop={{ top: 50, bottom: 50, right: 50, left: 50 }}
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