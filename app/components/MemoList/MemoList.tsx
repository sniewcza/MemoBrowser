import React from "react";
import { MemoSwipeRow } from "./MemoSwipeRow"
import { FlatList, View, StyleSheet, Text } from "react-native"
import { Memo } from "../../model/Memo"

interface Props {
    memos: Memo[]
    onDelete: (id: string) => any
    onItemPress: (id: string) => any
    onRename: (id: string, newName: string) => any
}

export class MemoList extends React.Component<Props>{
    _renderItem = ({ item }) => {
        return (
            < MemoSwipeRow
                id={item.id}
                name={item.name}
                photosCount={item.photos.length}
                onPress={this.props.onItemPress}
                onDelete={this.props.onDelete}
                onRename={this.props.onRename}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.memos}
                    renderItem={this._renderItem}
                    keyExtractor={(item: Memo) => item.id}
                >
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20
    },
    separator: {
        borderColor: '#e5e7ea',
        borderWidth: StyleSheet.hairlineWidth
    },
})