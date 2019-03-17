import React from "react"
import Icon from "react-native-vector-icons/Ionicons"
import { View, StyleSheet, TouchableOpacity } from "react-native"

export class ImageSwiperBottomBar extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <Icon name={"md-checkmark"} size={35} color={"red"}></Icon>
                </TouchableOpacity>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: "100%",
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    button: {
        marginRight: 20
    }
})