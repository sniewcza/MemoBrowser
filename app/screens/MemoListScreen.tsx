import React, { Component, memo } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { ActionButton } from "../components/Buttons/ActionButton"
import { MemoList } from "../components/MemoList/MemoList"
import { connect } from "react-redux"
import { deleteMemo } from "../store/index"
import { deleteMemoAlert } from "../components/Alerts/deleteMemoAlert"
type Props = {
    navigation: any;
    memos: any[]
    deleteMemo: (name: string) => any
};
class MemoListView extends Component<Props> {
    handleActionButtonPress = () => {
        this.props.navigation.navigate("MemoSeries")
    }
    handleDeleteMemo = (name: string) => {
        deleteMemoAlert(() => this.props.deleteMemo(name))
    }
    handleMemoItemPress = (name: string) => {
        const memoItem = this.props.memos.find(memo => memo.name === name)
        this.props.navigation.push("MemoSeriesDetails", { photos: memoItem.photos })
    }

    render() {
        return (
            <View style={styles.container}>
                <MemoList memos={this.props.memos} onItemPress={this.handleMemoItemPress} onDelete={this.handleDeleteMemo}></MemoList>
                <View style={styles.actionButton}>
                    <ActionButton backgroundColor={"red"} onPress={this.handleActionButtonPress}></ActionButton>
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
        deleteMemo: (name: string) => dispatch(deleteMemo(name))
    }
}
export const MemoListScreen = connect(mapStateToProps, mapDispatchToProps)(MemoListView)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    actionButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    }
});
