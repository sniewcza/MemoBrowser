import React from "react";
import { SwipeRow } from "native-base"
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

interface Props {
    name: string
    onDelete: (name: string) => any
}
export class MemoListItem extends React.PureComponent<Props>{
    deleteMemo = () => {
        this.props.onDelete(this.props.name)
    }
    render() {
        return (
            <SwipeRow
                style={{ marginVertical: 3, marginHorizontal: 5, elevation: 1 }}
                disableRightSwipe
                rightOpenValue={- 75}
                body={
                    < View style={styles.listItem} >
                        <Text>{this.props.name}</Text>
                    </View >
                }
                right={
                    < TouchableWithoutFeedback onPress={this.deleteMemo} >
                        <View style={styles.subMenu}>
                            <Icon name="md-trash" size={35}></Icon>
                        </View>
                    </TouchableWithoutFeedback >
                }
            ></SwipeRow >
        )
    }
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