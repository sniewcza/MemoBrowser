import React from "react";
import { ImageSwiper } from "../components/ImageSwpier/ImageSwiper"
import { View, Text, StyleSheet } from "react-native"
import { ImageSwiperBottomBar } from "../components/ImageSwpier/ImageSwiperBottomBar"
import { DeletePhotoHeaderButton } from "../components/Buttons/DeletePhotoHeaderButton"
import ImagePicker from "../api/ImagePicker"
import { connect } from "react-redux"
import { addMemo } from "../store/index"

interface Props {
    navigation: any
    addmemo: (photoList: any[]) => any
}

interface State {
    photos: any[],
    activePhotoIndex: number
}

class MemoSeriesPreview extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            photos: [],
            activePhotoIndex: -1
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: <DeletePhotoHeaderButton
                onPress={navigation.getParam('deleteHandler')}>
            </DeletePhotoHeaderButton>
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({ deleteHandler: this.deleteMemo });
    }
    takeCameraPhoto = async () => {
        const photo = await ImagePicker.takeCameraPhoto()
        if (photo) {
            this.setState(prevState => ({
                photos: [...prevState.photos, photo],
                activePhotoIndex: prevState.photos.length
            }))
        }
    }
    takeGaleryPhoto = async () => {
        const photo = await ImagePicker.takeGaleryPhoto()
        if (photo) {
            this.setState(prevState => ({
                photos: [...prevState.photos, photo],
                activePhotoIndex: prevState.photos.length
            }))
        }
    }

    addMemo = () => {
        this.props.addmemo(this.state.photos)
        this.props.navigation.goBack()
    }
    deleteMemo = () => {
        if (this.state.photos.length !== 0) {
            this.setState(prevState => ({
                photos: prevState.photos.filter((item, index) => index !== prevState.activePhotoIndex),
                activePhotoIndex: prevState.activePhotoIndex === prevState.photos.length - 1 ?
                    prevState.activePhotoIndex - 1 : prevState.activePhotoIndex
            }))

        }
    }
    handleSwipe = (index: number) => {
        this.setState({
            activePhotoIndex: index
        })
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
                            onIndexChange={this.handleSwipe}
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