import React from "react"
import { FlatList, View, Image, StyleSheet, Dimensions } from "react-native"
import { Photo } from "../model/Iterfaces";
import { NavigationScreenProps } from "react-navigation";

type Orientation = "portrait" | "landscape";

interface Props extends NavigationScreenProps {

}
interface State {
    photos: Photo[]
    orientation: Orientation
}

export class MemoSeriesDetails extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            photos: this.props.navigation.state.params.memo.photos,
            orientation: this.isPortrait() ? "portrait" : "landscape"
        }
        Dimensions.addEventListener('change', this.orientationChangeHandler
        );
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.orientationChangeHandler)
    }


    static navigationOptions = ({ navigation }: NavigationScreenProps) => {
        return {
            title: navigation.state.params.memo.name
        }
    }

    orientationChangeHandler = () => {
        this.setState({
            orientation: this.isPortrait() ? 'portrait' : 'landscape'
        });
    }
    isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    _renderItem = ({ item }: { item: Photo }) => {
        const aspectRatio = item.height / item.width
        const width = Dimensions.get("window").width
        return (
            <View style={{ width: width, height: width * aspectRatio }} >
                <Image source={{ uri: item.uri }} resizeMode={"contain"} style={{ width: "100%", height: "100%" }} />
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container} >
                <FlatList data={this.state.photos}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => Math.random().toString()}
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