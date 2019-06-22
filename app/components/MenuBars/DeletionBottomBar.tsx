import React, { PureComponent } from "react"
import { View, StyleSheet } from "react-native"
import { IconButton } from "../Buttons/IconButton"
import {Color} from "../../config/ColorTheme"
interface Props {
    onDeletePress: () => any
    onCancelPress: () => any
}
export class DeletionBottomBar extends PureComponent<Props> {
    render() {
        return (
            <View style={styles.container}>
                <IconButton iconName="md-close" iconSize={30} color={Color.onPrimary} onPress={this.props.onCancelPress}></IconButton>
                <IconButton iconName="md-trash" iconSize={30} color={Color.onPrimary} onPress={this.props.onDeletePress}></IconButton>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 50,
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems: "center",
        borderTopWidth:StyleSheet.hairlineWidth,
        backgroundColor:Color.primary
    }
})