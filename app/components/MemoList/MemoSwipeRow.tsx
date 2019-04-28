import React from "react";
import { SwipeRow } from "native-base"
import { View, StyleSheet, TouchableNativeFeedback, TextInput, Animated, TransformsStyle } from "react-native"
import SubMenuButton from "../Buttons/MemoListItemSubmenuButton"
import Icon from "react-native-vector-icons/Ionicons"
import { deleteMemoAlert } from "../Alerts/deleteMemoAlert"
import { MemoListItem } from "./MemoListItem"

interface Props {
    id: string
    name: string
    photosCount: number
    onDelete: (id: string) => any;
    onPress: (id: string) => any
    onRename: (id: string, newName: string) => any
}

interface State {
    renameMode: boolean
    memoName: string
}

export class MemoSwipeRow extends React.Component<Props, State>{

    private animated: Animated.Value
    private animatedStyle: TransformsStyle
    private row: SwipeRow | null
    constructor(props: Props) {
        super(props)
        this.row = null
        this.animated = new Animated.Value(0)
        this.animatedStyle = {
            transform: [
                {
                    scale: this.animated.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0],
                    }) as any as number
                }
            ]
        }
        this.state = {
            renameMode: false,
            memoName: this.props.name
        }
    }

    deleteMemo = () => {
        this.closeRow()
        deleteMemoAlert(() => {
            Animated.timing(this.animated, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true
            }).start(() => this.props.onDelete(this.props.id))

        })
    }

    onPress = () => {
        this.closeRow()
        this.props.onPress(this.props.id)
    }

    closeRow = () => {
        if (this.row)
            this.row._root.closeRow();
    }

    renameMemo = () => {
        this.closeRow()
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
            <Animated.View style={this.animatedStyle}>
                <SwipeRow
                    style={styles.swipeRow}
                    rightOpenValue={-100}
                    stopRightSwipe={-100}
                    disableRightSwipe
                    ref={ref => this.row = ref}
                    body={!this.state.renameMode ?
                        <TouchableNativeFeedback
                            onPress={this.onPress}
                            onLongPress={() => this.row._root.openRightRow()}>
                            <MemoListItem
                                style={styles.listItem}
                                name={this.props.name}
                                photosCount={this.props.photosCount}>
                            </MemoListItem>
                        </TouchableNativeFeedback>
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
                        <View style={styles.subMenu}>
                            <SubMenuButton onPress={this.renameMemo} style={styles.renameButton}>
                                <Icon name="md-create" size={30} color="white"></Icon>
                            </SubMenuButton>
                            <SubMenuButton onPress={this.deleteMemo} style={styles.deleteButton}>
                                <Icon name="md-trash" size={30} color="white"></Icon>
                            </SubMenuButton>
                        </View>
                    }
                ></SwipeRow >
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    swipeRow: {
        width: "100%",
        height: 48,
        paddingRight: 0, // override default swpieRow styles
        paddingTop: 0,// override default swpieRow styles
        paddingBottom: 0,// override default swpieRow styles
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    listItem: {
        flexDirection: 'row',
        width: "100%",
        height: "100%",
        paddingHorizontal: 5,
        alignItems: "center",
    },
    subMenu: {
        marginVertical: 1,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch",
    },
    deleteButton: {
        flex: 1,
        backgroundColor: 'red',
    },
    renameButton: {
        flex: 1,
        backgroundColor: 'green',
    }
})