import React from "react";
import Swiper from "react-native-web-swiper";
import { Image, View } from "react-native"

interface ImageSwiperProps {
    images: any[],
    activePhotoIndex: number
}
export class ImageSwiper extends React.Component<ImageSwiperProps, {}>{
    shouldComponentUpdate(nextProps: ImageSwiperProps) {
        if (this.props.images !== nextProps.images) {
            return true;
        }
        return false;
    }
    render() {
        console.log(this.props);

        const { images, activePhotoIndex } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <Swiper
                    key={Math.random()}
                    index={activePhotoIndex}
                    actionMinWidth={0.15}>
                    {images.map((image, index) => {
                        return (
                            <View style={{ flex: 1 }} >
                                < Image source={image} style={{ width: "100%", height: "100%" }} />
                            </View>
                        )
                    })}
                </Swiper>
            </View>
        )
    }
}