import React from "react";
import Swiper from "react-native-web-swiper";
import { Image, View } from "react-native"

export class ImageSwiper extends React.Component<{ images: [] }, {}>{
    render() {
        const { images } = this.props;
        return (
            <Swiper

            >
                <View style={{ flex: 1 }}>
                    < Image source={require("../../../assets/desert.jpg")} style={{ width: "100%", height: "100%" }} />
                </View>
                <View style={{ flex: 1 }}>
                    < Image source={require("../../../assets/sea.jpg")} style={{ width: "100%", height: "100%" }} />
                </View>
                {/* {images.map(image => {
                    return (
                        < Image source={require("../../Assets/desert.jpg")} resizeMode={"contain"} />

                    )
                })} */}
            </Swiper>
        )
    }
}