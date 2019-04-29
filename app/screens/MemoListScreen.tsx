import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { ActionButton } from "../components/Buttons/ActionButton"
import { MemoList } from "../components/MemoList/MemoList"
import { connect } from "react-redux"
import { removeMemo, loadMemos, renameMemo } from "../store/index"
import { Memo } from "../model/Memo"
import { Color } from "../config/ColorTheme"
import { NavigationScreenProps } from "react-navigation"

interface Props extends NavigationScreenProps {
    memos: Memo[]
    deleteMemo: (name: string) => any
    loadMemos: () => any
    renameMemo: (id: string, newName: string) => any
};

class MemoListView extends Component<Props> {
    componentDidMount() {
        StatusBar.setBackgroundColor(Color.statusBar, true)
        if (this.props.memos.length === 0) {
            this.props.loadMemos()
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

    render() {
        return (
            <View style={styles.container}>
                <MemoList
                    memos={this.props.memos}
                    onItemPress={this.handleMemoItemPress}
                    onDelete={this.handleDeleteMemo}
                    onRename={this.handleRenameMemo}
                >

                </MemoList>
                <View style={styles.actionButton}>
                    <ActionButton
                        backgroundColor={Color.secondary}
                        onPress={this.handleActionButtonPress}>
                    </ActionButton>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        memos: state.memos.memos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteMemo: (name: string) => dispatch(removeMemo(name)),
        loadMemos: () => dispatch(loadMemos()),
        renameMemo: (id: string, newName: string) => dispatch(renameMemo(id, newName))
    }
}

export const MemoListScreen = connect(mapStateToProps, mapDispatchToProps)(MemoListView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white" //'#F5FCFF',
    },
    actionButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    }
});
