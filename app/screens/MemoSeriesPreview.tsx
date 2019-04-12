import React from "react";
import { ImageSwiper } from "../components/ImageSwpier/ImageSwiper"
import { Modal, View, Text, StyleSheet } from "react-native"
import { ImageSwiperBottomBar } from "../components/ImageSwpier/ImageSwiperBottomBar"
import { DeletePhotoHeaderButton } from "../components/Buttons/DeletePhotoHeaderButton"
import { MemoDescriptionTextInput } from "../components/TextInputs/MemoDescriptionTextInput"
import ImagePicker from "../api/ImagePicker"
import { connect } from "react-redux"
import { addMemo } from "../store/index"

interface Props {
    navigation: any
    addmemo: (photoList: any[]) => any
}

interface State {
    photos: any[],
    activePhotoIndex: number;
    descriptionText: string
    modalActive: boolean
}

class MemoSeriesPreview extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            photos: [],
            activePhotoIndex: -1,
            modalActive: false,
            descriptionText: ""
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
        this.props.navigation.setParams({ deleteHandler: this.deletePhoto });
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

    deletePhoto = () => {
        if (this.state.photos.length !== 0) {
            this.setState(prevState => {
                const { photos, activePhotoIndex } = prevState
                return {
                    photos: photos.filter((item, index) => index !== activePhotoIndex),
                    activePhotoIndex: activePhotoIndex === photos.length - 1 ?
                        activePhotoIndex - 1 : activePhotoIndex
                }
            })

        }
    }

    handleSwipe = (index: number) => {
        this.setState({
            activePhotoIndex: index
        })
    }

    addDesctiption = () => {
        this.setState({
            modalActive: true
        })
    }

    onDescriptionTextChange = (text: string) => {
        this.setState({
            descriptionText: text
        })
    }

    onDescriptionAccept = () => {
        this.setState({
            modalActive: false
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
                <Modal
                    transparent
                    visible={this.state.modalActive}
                    onRequestClose={() => this.setState({
                        modalActive: false
                    })}>
                    <MemoDescriptionTextInput
                        visible={this.state.modalActive}
                        text={this.state.descriptionText}
                        onTextChange={this.onDescriptionTextChange}
                        onAccept={this.onDescriptionAccept}
                    >
                    </MemoDescriptionTextInput>
                </Modal>
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
                    addDescriptionPress={this.addDesctiption}
                    donePress={this.addMemo}
                    doneButtonActive={this.state.photos.length === 0 ? false : true} />

            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addmemo: (photoList: any[]) => dispatch(addMemo(photoList))
})

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