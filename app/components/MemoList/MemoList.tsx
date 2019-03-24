import React from "react";
import { MemoListItem } from "./MemoListItem"
import { FlatList, View, StyleSheet } from "react-native"

interface Props {
    memos: any[]
    onDelete: (name: string) => any
}
export class MemoList extends React.Component<Props>{
    _renderItem = ({ item }) => {
        return (
            < MemoListItem name={item.name} onDelete={this.props.onDelete} ></MemoListItem >
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