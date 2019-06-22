import React from "react";
import { MemoSwipeRow } from "./MemoSwipeRow"
import { FlatList, View, StyleSheet, Text } from "react-native"
import { Memo } from "../../model/Iterfaces"

interface Props {
    memos: Memo[]
    deletionMode: boolean
    onItemDelete: (id: string) => any
    onItemPress: (id: string) => any
    onItemLongPress: () => any
    onItemRename: (id: string, newName: string) => any
    onItemCheckChange: (id: string) => any
}

export class MemoList extends React.Component<Props>{
    _renderItem = ({ item }: { item: Memo }) => {
        const { deletionMode,
            onItemPress,
            onItemLongPress,
            onItemDelete,
            onItemCheckChange,
            onItemRename } = this.props
        return (
            < MemoSwipeRow
                memo={item}
                deletionMode={deletionMode}
                onPress={onItemPress}
                onLongPress={onItemLongPress}
                onDelete={onItemDelete}
                onRename={onItemRename}
                onCheck={onItemCheckChange}
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