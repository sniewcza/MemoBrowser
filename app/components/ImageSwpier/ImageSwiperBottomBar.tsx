import React from "react"
import Icon from "react-native-vector-icons/Ionicons"
import { View, StyleSheet, TouchableOpacity } from "react-native"

interface ImageSwiperBottomBarProps {
    addCameraPhotoPress: () => any,
    addGaleryPhotoPress: () => any,
    donePress: () => any
}
export class ImageSwiperBottomBar extends React.PureComponent<ImageSwiperBottomBarProps, {}> {
    render() {
        const { addCameraPhotoPress, addGaleryPhotoPress, donePress } = this.props
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={addCameraPhotoPress}>
                    <Icon name={"md-camera"} size={35} color={"red"}></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={addGaleryPhotoPress}>
                    <Icon name={"md-image"} size={35} color={"red"}></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={donePress}>
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
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    button: {
        marginRight: 20
    }
})