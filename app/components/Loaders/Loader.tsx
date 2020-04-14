import React from "react"
import { ViewStyle, View, ActivityIndicator } from "react-native"

interface Props {
    style: ViewStyle
    isLoading: boolean
}

export class Loader extends React.PureComponent<Props>{
    render() {
        return (
            <View style={this.props.style}>
                {this.props.isLoading ? <ActivityIndicator size="large" color="blue" /> : this.props.children}
            </View>
        )
    }
}