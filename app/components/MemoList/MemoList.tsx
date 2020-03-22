import React, { FC, useEffect, memo, } from "react";
import { MemoSwipeRow } from "./MemoSwipeRow"
import { FlatList, View, StyleSheet, Text, UIManager, LayoutAnimationConfig, LayoutAnimation } from "react-native"
import { Memo } from "../../model"
import { appStrings } from "../../config/Strings";

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

const CustomlayoutAnimationConfig: LayoutAnimationConfig = {
    duration: 150,
    update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
    },
}

interface Props {
    memos: Memo[]
    deletionMode: boolean
    onItemDelete: (id: string) => any
    onItemPress: (id: string) => any
    onItemLongPress: () => any
    onItemRename: (id: string, newName: string) => any
    onItemCheckChange: (id: string) => any
}

const List: FC<Props> = props => {
    const renderItem = ({ item }: { item: Memo }) => {
        const { deletionMode,
            onItemPress,
            onItemLongPress,
            onItemDelete,
            onItemCheckChange,
            onItemRename } = props
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
            data={props.memos}
            renderItem={renderItem}
            keyExtractor={(item: Memo) => item.id}
            ListEmptyComponent={listEmptyComponent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
        >
        </FlatList>
    )

}

export const MemoList = List
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