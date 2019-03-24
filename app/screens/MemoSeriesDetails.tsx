import React from "react"
import { FlatList, View, Image, StyleSheet, Dimensions } from "react-native"

interface Props {
    navigation: any
}
interface State {
    photos: any[]
}
const DEVICE_WIDTH = Dimensions.get("screen").width
export class MemoSeriesDetails extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            photos: this.props.navigation.state.params.photos
        }
    }

    _renderItem = ({ item }) => {
        const aspectRatio = item.height / item.width
        return (
            <View style={{ width: DEVICE_WIDTH, height: DEVICE_WIDTH * aspectRatio }} >
                <Image source={item} resizeMode={"contain"} style={{ flex: 1,width:"100%", height:"100%" }} />
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container} >
                <FlatList data={this.state.photos}
                    renderItem={this._renderItem}
                    keyExtractor={item => Math.random().toString()}
                    ItemSeparatorComponent={() => <View style={{ height: 5 }}></View>}>
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 5
    },
    image: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").width * 1.33,
        backgroundColor: "blue"
    }
})