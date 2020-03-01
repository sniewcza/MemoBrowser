import React, { FC, useEffect, useState } from "react"
import { FlatList, View, Image, StyleSheet, Dimensions } from "react-native"
import { Photo } from "../model";

type Orientation = "portrait" | "landscape";


interface Props {
    navigation: any,
    route: any
}

const getOrientation = (): Orientation => {
    const { height, width } = Dimensions.get('screen');
    return height >= width ? "portrait" : "landscape"
};

export const MemoSeriesDetails: FC<Props> = (props) => {
    const [orientation, setOrientation] = useState<Orientation>(getOrientation())
    useEffect(() => {
        Dimensions.addEventListener('change', orientationChangeHandler
        );
        return () => {
            Dimensions.removeEventListener("change", orientationChangeHandler)
        }
    }, [])

    const orientationChangeHandler = () => {
        setOrientation(getOrientation())
    }

    const getImageStyle = (photo: Photo) => {
        const { width } = Dimensions.get("screen")
        const aspectRatio = photo.height / photo.width
        switch (orientation) {
            case "portrait":
                return {
                    width: width,
                    height: width * aspectRatio
                }
            case "landscape":
                return {
                    width: width * 0.8,
                    height: width * 0.8 * aspectRatio
                }
        }

    }

    const renderItem = ({ item }: { item: Photo }) => {
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }} >
                <Image source={{ uri: item.uri }} resizeMode={"cover"} style={getImageStyle(item)} />
            </View>
        )
    }

    return (
        <View style={styles.container} >
            <FlatList data={props.route.params.memo.photos}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item) => item.uri}
                ItemSeparatorComponent={() => <View style={{ height: 5 }}></View>}>
            </FlatList>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 5
    }
})