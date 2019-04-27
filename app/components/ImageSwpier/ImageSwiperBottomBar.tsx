import React from "react"
import Icon from "react-native-vector-icons/Ionicons"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Color } from "../../config/ColorTheme"

interface ImageSwiperBottomBarProps {
    iconSize: number;
    doneButtonActive: boolean;
    addCameraPhotoPress: () => any;
    addGaleryPhotoPress: () => any;
    addDescriptionPress: () => any;
    donePress: () => any
}
export class ImageSwiperBottomBar extends React.PureComponent<ImageSwiperBottomBarProps, {}> {
    render() {
        const { addCameraPhotoPress,
            addGaleryPhotoPress,
            donePress,
            doneButtonActive,
            addDescriptionPress,
            iconSize } = this.props
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={addCameraPhotoPress}>
                    <Icon name={"md-camera"} size={iconSize} color={Color.onPrimary}></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={addGaleryPhotoPress}>
                    <Icon name={"md-image"} size={iconSize} color={Color.onPrimary}></Icon>
                </TouchableOpacity>
                <TouchableOpacity style={doneButtonActive ? null : styles.inAcvtive} onPress={addDescriptionPress} disabled={!doneButtonActive} >
                    <Icon name={"md-create"} size={iconSize} color={Color.onPrimary}></Icon>
                </TouchableOpacity>
                <TouchableOpacity style={doneButtonActive ? null : styles.inAcvtive} onPress={donePress} disabled={!doneButtonActive}>
                    <Icon name={"md-checkmark"} size={iconSize} color={Color.onPrimary}></Icon>
                </TouchableOpacity>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: "100%",
        backgroundColor: Color.primary,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderTopWidth: StyleSheet.hairlineWidth
    },
    inAcvtive: {
        opacity: 0.4
    }
})