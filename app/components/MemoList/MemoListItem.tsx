import React from "react";
import { SwipeRow } from "native-base"
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

interface Props {
    id: string
    name: string
    onDelete: (id: string) => any;
    onPress: (id: string) => any
}
export class MemoListItem extends React.PureComponent<Props>{
    constructor(props) {
        super(props)
        this.row = null
    }
    deleteMemo = () => {
        this.row._root.closeRow();
        this.props.onDelete(this.props.id)
    }
    onPress = () => {
        this.props.onPress(this.props.id)
    }
    render() {
        return (
            <SwipeRow
                style={styles.swipeRow}
                disableRightSwipe
                rightOpenValue={- 75}
                ref={ref => this.row = ref}
                body={
                    <TouchableWithoutFeedback onPress={this.onPress}>
                        < View style={styles.listItem} >
                            <Text>{this.props.name}</Text>
                        </View >
                    </TouchableWithoutFeedback>
                }
                right={
                    < TouchableWithoutFeedback onPress={this.deleteMemo} >
                        <View style={styles.subMenu}>
                            <Icon name="md-trash" size={30} color="black"></Icon>
                        </View>
                    </ TouchableWithoutFeedback >
                }
            ></SwipeRow >

        )
    }
}

const styles = StyleSheet.create({
    swipeRow: {
        marginVertical: 3,
        marginHorizontal: 5,
        elevation: 1,
        borderRadius: 15
    },
    listItem: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    subMenu: {
        margin: 6,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'red',
        borderRadius: 100
    }
})