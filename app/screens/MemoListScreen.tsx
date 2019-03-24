import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActionButton } from "../components/Buttons/ActionButton"
import { MemoList } from "../components/MemoList/MemoList"
import { connect } from "react-redux"

type Props = {
    navigation: any;
    memos: any[]
};
class MemoListView extends Component<Props> {
    handlePress = () => {
        this.props.navigation.navigate("MemoSeries")
    }
    render() {
        return (
            <View style={styles.container}>
                <MemoList memos={this.props.memos}></MemoList>
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
export const MemoListScreen = connect(mapStateToProps, null)(MemoListView)
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
