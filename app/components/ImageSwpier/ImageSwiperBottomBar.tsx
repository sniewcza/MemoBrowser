import React from "react"
import { View, StyleSheet } from "react-native"
import { Color } from "../../config/ColorTheme"
import { IconButton } from "../Buttons/IconButton"

interface Props {
    iconSize: number;
    doneButtonActive: boolean;
    addCameraPhotoPress: () => any;
    addGaleryPhotoPress: () => any;
    addDescriptionPress: () => any;
    donePress: () => any
}

export class ImageSwiperBottomBar extends React.PureComponent<Props> {
    render() {
        const {
            addCameraPhotoPress,
            addGaleryPhotoPress,
            donePress,
            doneButtonActive,
            addDescriptionPress,
            iconSize } = this.props
        return (
            <View style={styles.container}>
                <IconButton
                    onPress={addCameraPhotoPress}
                    style={styles.active}
                    iconName={"md-camera"}
                    iconSize={iconSize}
                    color={Color.onPrimary}
                />
                <IconButton
                    onPress={addGaleryPhotoPress}
                    style={styles.active}
                    iconName={"md-image"}
                    iconSize={iconSize}
                    color={Color.onPrimary}
                />
                <IconButton
                    onPress={addDescriptionPress}
                    style={doneButtonActive ? styles.active : styles.inAcvtive}
                    disabled={!doneButtonActive}
                    iconName={"md-create"}
                    iconSize={iconSize}
                    color={Color.onPrimary}
                />
                <IconButton
                    onPress={donePress}
                    style={doneButtonActive ? styles.active : styles.inAcvtive}
                    disabled={!doneButtonActive}
                    iconName={"md-checkmark"}
                    iconSize={iconSize}
                    color={Color.onPrimary}
                />
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
    },
    active: {
        padding: 3
    }
})