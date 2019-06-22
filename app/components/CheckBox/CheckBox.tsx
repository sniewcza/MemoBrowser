import React, { PureComponent } from "react"
import { View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Color } from "../../config/ColorTheme"
interface Props {
    checked: boolean
}

export class CheckBox extends PureComponent<Props> {
    render() {
        return (
            <View>
                <Icon name={this.props.checked ? "md-checkbox-outline" : "md-square-outline"} size={30} color={Color.primary}></Icon>
            </View>
        )
    }
}