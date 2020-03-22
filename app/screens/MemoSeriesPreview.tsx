import React, { FC, useEffect, useState } from "react";
import { ImageSwiper } from "../components/ImageSwpier/ImageSwiper"
import { Modal, View, Text, StyleSheet, Keyboard } from "react-native"
import { ImageSwiperBottomBar } from "../components/ImageSwpier/ImageSwiperBottomBar"
import { MemoDescriptionTextInput } from "../components/TextInputs/MemoDescriptionTextInput"
import ImagePicker from "../api/ImagePicker"
import { useDispatch } from "react-redux"
import { addMemo } from "../store/index"
import { Color } from "../config/ColorTheme"
import { IconButton } from "../components/Buttons/IconButton"
import { Photo } from "../model";
import { appStrings } from "../config/Strings";
import { useNavigation } from "@react-navigation/native";

interface State {
    photos: Photo[],
    activeIndex: number;
}

export const MemoSeriesPreview: FC = props => {
    const [state, setState] = useState<State>({ photos: [], activeIndex: -1 })
    const [modalActive, setModalActive] = useState(false)
    const [descriptionText, setDescriptionText] = useState('')
    const dispatch = useDispatch()
    const navigation = useNavigation()

    useEffect(() => {
        const keyboardSub = Keyboard.addListener("keyboardDidHide", keyboardDidHide)
        return () => {
            keyboardSub && keyboardSub.remove()
        }
    })

    const deletePhoto = () => {
        const { photos, activeIndex } = state
        if (photos.length !== 0) {
            setState({
                photos: [...photos.filter((item, index) => index !== activeIndex)],
                activeIndex: activeIndex === photos.length - 1 ?
                    activeIndex - 1 : activeIndex
            })
        }
    }

    navigation.setOptions({
        headerRight: () =>
            <IconButton
                onPress={deletePhoto}
                style={styles.headerButton}
                iconName={"md-trash"}
                iconSize={30}
                color={Color.onPrimary}
            />
    })

    const keyboardDidHide = () => {
        if (modalActive) {
            setModalActive(false)
        }
    }

    const takeCameraPhoto = async () => {
        const photo = await ImagePicker.takeCameraPhoto()
        if (photo) {
            setState({
                photos: [...state.photos, photo],
                activeIndex: state.photos.length
            })

        }
    }

    const takeGaleryPhoto = async () => {
        const photo = await ImagePicker.takeGaleryPhoto()
        if (photo) {
            setState({
                photos: [...state.photos, photo],
                activeIndex: state.photos.length
            })
        }
    }
    const handleConfirmButton = () => {
        dispatch(addMemo(descriptionText, state.photos))
        navigation.goBack()
    }

    const handleSwipe = (index: number) => {
        setState({
            photos: [...state.photos],
            activeIndex: index
        })
    }

    const addDesctiption = () => {
        setModalActive(true)
    }

    const onDescriptionTextChange = (text: string) => {
        setDescriptionText(text)
    }

    const onDescriptionAccept = () => {
        setModalActive(false)
    }

    const noPhotoContent = () => {
        return (
            <View style={{ alignItems: "center" }}>
                <Text adjustsFontSizeToFit={true} >{appStrings.emptyPhotoSeriesLabel}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainContent}>
                {state.photos.length === 0 ?
                    noPhotoContent() :
                    <ImageSwiper
                        photos={state.photos}
                        activePhotoIndex={state.activeIndex}
                        onIndexChange={handleSwipe}
                    />
                }
            </View>
            <ImageSwiperBottomBar
                iconSize={30}
                addCameraPhotoPress={takeCameraPhoto}
                addGaleryPhotoPress={takeGaleryPhoto}
                addDescriptionPress={addDesctiption}
                donePress={handleConfirmButton}
                doneButtonActive={state.photos.length === 0 ? false : true}
            />
            <Modal
                animated
                animationType="slide"
                hardwareAccelerated={true}
                visible={modalActive}
                onRequestClose={() => setModalActive(false)}>
                < MemoDescriptionTextInput
                    visible={modalActive}
                    text={descriptionText}
                    onTextChange={onDescriptionTextChange}
                    onAccept={onDescriptionAccept}

                />
            </Modal>
        </View >
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerButton: {
        padding: 4,
        marginRight: 20
    },
    mainContent: {
        flex: 9,
        justifyContent: "center",
    },
})