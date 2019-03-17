import React from "react";
import { SwipeRow } from "native-base"
import { Text, View, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

export const MemoListItem = (props: any) => {
    return (
        <SwipeRow
            style={{ marginVertical: 3, marginHorizontal: 5, elevation: 1 }}
            disableRightSwipe
            rightOpenValue={-75}
            body={
                <View style={styles.listItem}>
                    <Text>{props.data}</Text>
                </View>
            }
            right={
                <View style={styles.subMenu}>
                    <Icon name="md-trash" size={35}></Icon>
                </View>
            }
        ></SwipeRow>
    )
}

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        // margin: 3
    },
    subMenu: {
        margin: 6,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'red'
    }
})