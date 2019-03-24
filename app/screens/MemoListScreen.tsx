import React, { Component } from 'react';
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
    handlePress = () => {
        this.props.navigation.navigate("MemoSeries")
    }
    handleDeleteMemo = (name: string) => {
        deleteMemoAlert(() => this.props.deleteMemo(name))
    }
    render() {
        return (
            <View style={styles.container}>
                <MemoList memos={this.props.memos} onDelete={this.handleDeleteMemo}></MemoList>
                <View style={styles.actionButton}>
                    <ActionButton backgroundColor={"red"} onPress={this.handlePress}></ActionButton>
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
