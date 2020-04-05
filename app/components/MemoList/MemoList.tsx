import React, { FC, memo, } from "react";
import { MemoSwipeRow } from "./MemoSwipeRow"
import { FlatList, View, StyleSheet, Text } from "react-native"
import { Memo } from "../../model"
import { appStrings } from "../../config/Strings";

interface Props {
    memos: Memo[]
    deletionMode: boolean
    onItemDelete: (id: string) => any
    onItemPress: (id: string) => any
    onItemLongPress: () => any
    onItemRename: (id: string, newName: string) => any
    onItemCheckChange: (id: string) => any
}

const List: FC<Props> = ({ memos, deletionMode, onItemCheckChange, onItemDelete, onItemLongPress, onItemPress, onItemRename }) => {
    const renderItem = ({ item }: { item: Memo }) => {
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

    const listEmptyComponent = () => {
        return (
            <View style={styles.emptyList}>
                <Text style={styles.text}>{appStrings.emptyMemoListLabel}</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={memos}
            renderItem={renderItem}
            keyExtractor={(item: Memo) => item.id}
            ListEmptyComponent={listEmptyComponent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
        />
    )

}

export const MemoList = memo(List)

const styles = StyleSheet.create({
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