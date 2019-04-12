import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActionButton } from "../components/Buttons/ActionButton"
import { MemoList } from "../components/MemoList/MemoList"
import { connect } from "react-redux"
import { removeMemo, loadMemos } from "../store/index"
import { deleteMemoAlert } from "../components/Alerts/deleteMemoAlert"
type Props = {
    navigation: any;
    memos: any[]
    deleteMemo: (name: string) => any
    loadMemos: () => any
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

    componentDidMount() {
        if (this.props.memos.length === 0) {
            this.props.loadMemos()
        }
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
        deleteMemo: (name: string) => dispatch(removeMemo(name)),
        loadMemos: () => dispatch(loadMemos())
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
