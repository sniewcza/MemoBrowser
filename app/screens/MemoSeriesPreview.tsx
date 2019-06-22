import React from "react";
import { ImageSwiper } from "../components/ImageSwpier/ImageSwiper"
import { Modal, View, Text, StyleSheet, Keyboard, EmitterSubscription } from "react-native"
import { ImageSwiperBottomBar } from "../components/ImageSwpier/ImageSwiperBottomBar"
import { MemoDescriptionTextInput } from "../components/TextInputs/MemoDescriptionTextInput"
import ImagePicker from "../api/ImagePicker"
import { connect } from "react-redux"
import { addMemo } from "../store/index"
import { Color } from "../config/ColorTheme"
import { NavigationScreenProps } from "react-navigation"
import { IconButton } from "../components/Buttons/IconButton"
import { Photo } from "../model/Iterfaces";

interface Props extends NavigationScreenProps {
    addmemo: (name: string, photoList: Photo[]) => any
}

interface State {
    photos: Photo[],
    activePhotoIndex: number;
    descriptionText: string
    modalActive: boolean
}

class MemoSeriesPreview extends React.Component<Props, State>{
    private keyboardEventSubscription: EmitterSubscription | null
    constructor(props: Props) {
        super(props)
        this.keyboardEventSubscription = null
        this.state = {
            photos: [],
            activePhotoIndex: -1,
            modalActive: false,
            descriptionText: ""
        }
    }

    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            headerRight:
                <IconButton
                    onPress={navigation.getParam('deleteHandler')}
                    style={styles.headerButton}
                    iconName={"md-trash"}
                    iconSize={30}
                    color={Color.onPrimary}
                />
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({ deleteHandler: this.deletePhoto });
        this.keyboardEventSubscription = Keyboard.addListener("keyboardDidHide", this.keyboardDidHide)
    }

    componentWillUnmount() {
        if (this.keyboardEventSubscription) {
            this.keyboardEventSubscription.remove()
        }
    }

    keyboardDidHide = () => {
        if (this.state.modalActive) {
            this.setState({
                modalActive: false
            })
        }
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
        const { descriptionText, photos } = this.state
        this.props.addmemo(descriptionText, photos)
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
                    iconSize={30}
                    addCameraPhotoPress={this.takeCameraPhoto}
                    addGaleryPhotoPress={this.takeGaleryPhoto}
                    addDescriptionPress={this.addDesctiption}
                    donePress={this.addMemo}
                    doneButtonActive={this.state.photos.length === 0 ? false : true}
                />
                <Modal
                    animated
                    animationType="slide"
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

            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addmemo: (name: string, photoList: Photo[]) => dispatch(addMemo(name, photoList))
})

export const MemoSeriesPreviewScreen = connect(null, mapDispatchToProps)(MemoSeriesPreview)

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
    initialText: {
        fontSize: 16
    }
})