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
    _renderItem = ({ item }: { item: Memo }) => {
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

    listEmptyComponent = () => {
        return (
            <View style={styles.emptyList}>
                <Text style={styles.text}>Memo list is empty</Text>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.memos}
                    renderItem={this._renderItem}
                    keyExtractor={(item: Memo) => item.id}
                    ListEmptyComponent={this.listEmptyComponent}
                    contentContainerStyle={{ flexGrow: 1 }}
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
    emptyList: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        letterSpacing: 1
    }
})