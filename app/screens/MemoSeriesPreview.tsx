import React from "react";
import { ImageSwiper } from "../components/ImageSwpier/ImageSwiper"
import { View } from "react-native"
import { ImageSwiperBottomBar } from "../components/ImageSwpier/ImageSwiperBottomBar"
interface MemoSeriesPreviewProps {
    navigation: any
}


export class MemoSeriesPreview extends React.Component<MemoSeriesPreviewProps, { photos: [], activePhotoIndex: number }>{
    constructor(props: MemoSeriesPreviewProps) {
        super(props)
        this.state = {
            photos: [],
            activePhotoIndex: -1
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageSwiper
                    images={this.state.photos}>

                </ImageSwiper>
                <ImageSwiperBottomBar />
            </View>
        )
    }
}