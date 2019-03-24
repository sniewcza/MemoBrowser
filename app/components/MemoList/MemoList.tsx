import React from "react";
import { MemoListItem } from "./MemoListItem"
import { FlatList, View, StyleSheet } from "react-native"

interface Props {
    memos: any[]
}
export class MemoList extends React.Component<Props>{
    _renderItem = ({ item }) => {
        return (
            < MemoListItem data={item} ></MemoListItem >
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.memos}
                    renderItem={this._renderItem}
                    keyExtractor={item => Math.random().toString()}
                >
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})