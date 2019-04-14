import React from "react";
import { MemoListItem } from "./MemoListItem"
import { FlatList, View, StyleSheet } from "react-native"
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
            < MemoListItem
                id={item.id}
                name={item.name}
                onPress={this.props.onItemPress}
                onDelete={this.props.onDelete}
                onRename={this.props.onRename}
            >
            </MemoListItem >
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
        flex: 1
    }
})