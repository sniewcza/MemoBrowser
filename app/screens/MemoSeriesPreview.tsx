import React from "react";
import { ImageSwiper } from "../components/ImageSwpier/ImageSwiper"
import { View, Text, StyleSheet } from "react-native"
import { ImageSwiperBottomBar } from "../components/ImageSwpier/ImageSwiperBottomBar"
import ImagePicker from 'react-native-image-picker';
import { connect } from "react-redux"
import { addMemo } from "../store/index"

interface MemoSeriesPreviewProps {
    navigation: any
    addmemo: (photoList: any[]) => any
}

interface MemoSeriesPreviewState {
    photos: any[],
    activePhotoIndex: number
}

class MemoSeriesPreview extends React.Component<MemoSeriesPreviewProps, MemoSeriesPreviewState>{
    constructor(props: MemoSeriesPreviewProps) {
        super(props)
        this.state = {
            photos: [],
            activePhotoIndex: -1
        }
    }

    takeCameraPhoto = () => {
        ImagePicker.launchCamera({
            noData: true, mediaType: 'photo', storageOptions: {
                path: "MemoBrowser",
                // cameraRoll: true,
                // waitUntilSaved: true,
            }
        }, this.handleNewImage)
    }
    takeGaleryPhoto = () => {
        ImagePicker.launchImageLibrary({
            noData: true, mediaType: 'photo', storageOptions: {
                path: "MemoBrowser",
                // cameraRoll: true,
                // waitUntilSaved: true,
            }
        }, this.handleNewImage)
    }

    handleNewImage = response => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
            this.props.navigation.goBack();
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            const source = { uri: response.uri };
            //console.log(response.path);

            this.setState(prevState => ({
                photos: [...prevState.photos, response],
                activePhotoIndex: prevState.photos.length
            }))
        }
    }
    addMemo = () => {
        this.props.addmemo(this.state.photos)
        this.props.navigation.goBack()
    }
    noPhotoContent = () => {
        return (
            <View style={{ alignItems: "center" }}>
                <Text style={styles.initialText} >Take photo from camera or pick some from gallery</Text>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mainContent}>
                    {this.state.photos.length === 0 ?
                        this.noPhotoContent() :
                        <ImageSwiper
                            images={this.state.photos}
                            activePhotoIndex={this.state.activePhotoIndex}
                        >
                        </ImageSwiper>
                    }
                </View>
                <ImageSwiperBottomBar
                    addCameraPhotoPress={this.takeCameraPhoto}
                    addGaleryPhotoPress={this.takeGaleryPhoto}
                    donePress={this.addMemo}
                    doneButtonActive={this.state.photos.length === 0 ? false : true} />

            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addmemo: (photoList: any[]) => dispatch(addMemo(photoList))
    }
}
export const MemoSeriesPreviewScreen = connect(null, mapDispatchToProps)(MemoSeriesPreview)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainContent: {
        flex: 9,
        justifyContent: "center",
    },
    initialText: {
        fontSize: 16
    }
})