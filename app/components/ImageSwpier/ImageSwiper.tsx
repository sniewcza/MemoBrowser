import React from "react";
import ViewPager from "@react-native-community/viewpager";
import { Image, View, StyleSheet } from "react-native"
import { Photo } from "../../model";

interface Props {
    photos: Photo[],
    activePhotoIndex: number,
    onIndexChange: (index: number) => any
}

export class ImageSwiper extends React.Component<Props>{
    pager: ViewPager | null;

    componentDidUpdate(prevProps: Readonly<Props>, prevState) {
        if (this.pager) {
            if (prevProps.photos !== this.props.photos) {
                this.pager.setPage(this.props.activePhotoIndex)
            }
        }
    }

    onPageSelected = ({ nativeEvent }) => {
        this.props.onIndexChange(nativeEvent.position)
    }

    render() {
        const { photos } = this.props;
        return (
            <View style={styles.container}>
                <ViewPager
                    style={styles.container}
                    onPageSelected={this.onPageSelected}
                    ref={ref => this.pager = ref}
                    pageMargin={10}
                >
                    {photos.map((image, index) => {
                        return (
                            <View style={styles.container} key={index}>
                                < Image source={image} style={{ width: "100%", height: "100%" }} />
                            </View>
                        )
                    })}
                </ViewPager>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})