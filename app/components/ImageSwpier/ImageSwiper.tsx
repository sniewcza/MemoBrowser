import React from "react";
import Swiper from "react-native-web-swiper";
import { Image, View, StyleSheet } from "react-native"

interface Props {
    images: any[],
    activePhotoIndex: number,
    onIndexChange: (index: number) => any
}
export class ImageSwiper extends React.Component<Props>{
    shouldComponentUpdate(nextProps: Props) {
        if (this.props.images !== nextProps.images) {
            return true;
        }
        return false;
    }
    render() {
        const { images, activePhotoIndex, onIndexChange } = this.props;
        return (
            <View style={styles.container}>
                <Swiper
                    key={images.length}
                    onIndexChanged={onIndexChange}
                    index={activePhotoIndex}
                    actionMinWidth={0.15}>
                    {images.map((image, index) => {
                        return (
                            <View style={styles.container} key={index}>
                                < Image source={image} style={{ width: "100%", height: "100%" }} />
                            </View>
                        )
                    })}
                </Swiper>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})