import React from "react"
import Icon from "react-native-vector-icons/Ionicons"
import { View, StyleSheet, TouchableOpacity } from "react-native"

interface ImageSwiperBottomBarProps {
    doneButtonActive: boolean;
    addCameraPhotoPress: () => any;
    addGaleryPhotoPress: () => any;
    addDescriptionPress: () => any;
    donePress: () => any
}
export class ImageSwiperBottomBar extends React.PureComponent<ImageSwiperBottomBarProps, {}> {
    render() {
        const { addCameraPhotoPress, addGaleryPhotoPress, donePress, doneButtonActive, addDescriptionPress } = this.props
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={addCameraPhotoPress}>
                    <Icon name={"md-camera"} size={35} color={"red"}></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={addGaleryPhotoPress}>
                    <Icon name={"md-image"} size={35} color={"red"}></Icon>
                </TouchableOpacity>
                <TouchableOpacity style={doneButtonActive ? null : styles.inAcvtive} onPress={addDescriptionPress} disabled={!doneButtonActive} >
                    <Icon name={"md-create"} size={35} color={"red"}></Icon>
                </TouchableOpacity>
                <TouchableOpacity style={doneButtonActive ? null : styles.inAcvtive} onPress={donePress} disabled={!doneButtonActive}>
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
        borderTopWidth: StyleSheet.hairlineWidth
    },
    inAcvtive: {
        opacity: 0.4
    }
})