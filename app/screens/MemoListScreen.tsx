import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Animated, Dimensions, UIManager, LayoutAnimation, LayoutAnimationConfig } from 'react-native';
import { ActionButton } from "../components/Buttons/ActionButton"
import { MemoList } from "../components/MemoList/MemoList"
import { connect } from "react-redux"
import { removeMemo, loadMemos, renameMemo, removeMemos, AppState } from "../store"
import { Color } from "../config/ColorTheme"
import { NavigationScreenProps } from "react-navigation"
import { DeletionBottomBar } from "../components/MenuBars/DeletionBottomBar"
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const CustomlayoutAnimationConfig: LayoutAnimationConfig = {
    duration: 500,
    update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
    },
}

type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    NavigationScreenProps

interface State {
    deletionMode: boolean
    memosToDelete: string[]
}

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

class MemoListView extends Component<Props, State> {
    actionButtonAnimatedValue: Animated.Value;
    deletionMenuBarAnimatedValue: Animated.Value;
    constructor(props: Props) {
        super(props)
        this.actionButtonAnimatedValue = new Animated.Value(0)
        this.deletionMenuBarAnimatedValue = new Animated.Value(Dimensions.get("window").height)
        this.state = {
            deletionMode: false,
            memosToDelete: []
        }
    }

    componentDidMount() {
        StatusBar.setBackgroundColor(Color.statusBar, true)
        if (this.props.memos.length === 0) {
            this.props.loadMemos()
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        if (prevState.deletionMode === false && this.state.deletionMode === true) {
            this.enterDeletionModeAnimation().start()
        }
        if (prevState.deletionMode === true && this.state.deletionMode === false) {
            this.closeDeletionModeAnimation().start()
            this.setState({
                memosToDelete: []
            })
        }
        if (prevProps.memos !== this.props.memos) {
            LayoutAnimation.configureNext(CustomlayoutAnimationConfig)
        }
    }

    handleActionButtonPress = () => {
        this.props.navigation.navigate("MemoSeries")
    }

    handleDeleteMemo = (id: string) => {
        this.props.deleteMemo(id)
    }

    handleMemoItemPress = (id: string) => {
        const memo = this.props.memos.find(memo => memo.id === id)
        this.props.navigation.push("MemoSeriesDetails", { memo })
    }

    handleRenameMemo = (id: string, newName: string) => {
        this.props.renameMemo(id, newName)
    }

    handleMemoItemLongPress = () => {
        this.setState({
            deletionMode: true
        })
    }

    handleMemoItemCheckChange = (id: string) => {
        const memosToDelete = this.state.memosToDelete.slice()
        const index = memosToDelete.findIndex(item => item === id)
        if (index !== -1) {
            this.setState({
                memosToDelete: [...memosToDelete.slice(0, index), ...memosToDelete.slice(index + 1)]
            })
        }
        else {
            this.setState({
                memosToDelete: [...memosToDelete, id]
            })
        }

    }

    cancelDeletionMode = () => {
        this.setState({
            deletionMode: false
        })
    }

    deleteMemos = () => {
        const { memosToDelete } = this.state
        if (memosToDelete.length !== 0) {
            this.cancelDeletionMode()
            this.props.deleteMemos(memosToDelete)
        }
    }

    enterDeletionModeAnimation = () => {
        return Animated.parallel([
            Animated.timing(this.actionButtonAnimatedValue, {
                toValue: Dimensions.get("window").width + 50,
                duration: 500
            }),
            Animated.timing(this.deletionMenuBarAnimatedValue, {
                toValue: 0,
                duration: 300
            })])
    }

    closeDeletionModeAnimation = () => {
        return Animated.parallel([
            Animated.timing(this.actionButtonAnimatedValue, {
                toValue: 0,
                duration: 300
            }),
            Animated.timing(this.deletionMenuBarAnimatedValue, {
                toValue: Dimensions.get("window").height,
                duration: 300
            })])
    }

    render() {
        return (
            <View style={styles.container}>
                <MemoList
                    memos={this.props.memos}
                    onItemPress={this.handleMemoItemPress}
                    onItemLongPress={this.handleMemoItemLongPress}
                    onItemDelete={this.handleDeleteMemo}
                    onItemRename={this.handleRenameMemo}
                    onItemCheckChange={this.handleMemoItemCheckChange}
                    deletionMode={this.state.deletionMode}
                />
                <Animated.View style={[styles.actionButton, { transform: [{ translateX: this.actionButtonAnimatedValue }] }]}>
                    <ActionButton
                        backgroundColor={Color.secondary}
                        onPress={this.handleActionButtonPress}
                    />
                </Animated.View>
                <Animated.View style={[styles.menuBar, { transform: [{ translateY: this.deletionMenuBarAnimatedValue }] }]}>
                    <DeletionBottomBar onCancelPress={this.cancelDeletionMode} onDeletePress={this.deleteMemos} />
                </Animated.View>
            </View>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        memos: state.memos.memos
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        deleteMemo: (id: string) => dispatch(removeMemo(id)),
        loadMemos: () => dispatch(loadMemos()),
        renameMemo: (id: string, newName: string) => dispatch(renameMemo(id, newName)),
        deleteMemos: (ids: string[]) => dispatch(removeMemos(ids))
    }
}

export const MemoListScreen = connect(mapStateToProps, mapDispatchToProps)(MemoListView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    actionButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    menuBar: {
        position: 'absolute',
        bottom: 0,
    }
});
