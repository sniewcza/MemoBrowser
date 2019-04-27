import React from "react";
import { SwipeRow } from "native-base"
import { Text, View, StyleSheet, TouchableWithoutFeedback, TextInput } from "react-native"
import SubMenuButton from "../Buttons/MemoListItemSubmenuButton"
import Icon from "react-native-vector-icons/Ionicons"

interface Props {
    id: string
    name: string
    onDelete: (id: string) => any;
    onPress: (id: string) => any
    onRename: (id: string, newName: string) => any
}

interface State {
    renameMode: boolean
    memoName: string
}

export class MemoListItem extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.row = null
        this.state = {
            renameMode: false,
            memoName: this.props.name
        }
    }

    deleteMemo = () => {
        this.row._root.closeRow();
        this.props.onDelete(this.props.id)
    }

    onPress = () => {
        this.props.onPress(this.props.id)
    }

    renameMemo = () => {
        this.row._root.closeRow();
        this.setState({
            renameMode: true
        })
    }

    closeTextInput = () => {
        this.props.onRename(this.props.id, this.state.memoName)
        this.setState({
            renameMode: false
        })
    }

    handleTextChange = (text: string) => {
        this.setState({
            memoName: text
        })
    }

    render() {
        return (
            <SwipeRow
                style={styles.swipeRow}
                rightOpenValue={-75}
                leftOpenValue={75}
                ref={ref => this.row = ref}
                body={!this.state.renameMode ?
                    <TouchableWithoutFeedback onPress={this.onPress}>
                        < View style={styles.listItem} >
                            <Text>{this.props.name}</Text>
                        </View >
                    </TouchableWithoutFeedback>
                    :
                    <View style={styles.listItem}>
                        <TextInput
                            autoFocus
                            placeholder={this.state.memoName}
                            value={this.state.memoName}
                            onChangeText={this.handleTextChange}
                            onBlur={this.closeTextInput}>
                        </TextInput>
                    </View>
                }
                right={
                    <SubMenuButton onPress={this.deleteMemo} style={[styles.subMenu, styles.deleteButton]}>
                        <Icon name="md-trash" size={30} color="black"></Icon>
                    </SubMenuButton>
                }
                left={
                    <SubMenuButton onPress={this.renameMemo} style={[styles.subMenu, styles.renameButton]}>
                        <Icon name="md-create" size={30} color="black"></Icon>
                    </SubMenuButton>

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
        // borderRadius: 15
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
        borderRadius: 50
    },
    deleteButton: {
        backgroundColor: 'red',
    },
    renameButton: {
        backgroundColor: 'green',
    }
})