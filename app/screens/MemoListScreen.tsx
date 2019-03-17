import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActionButton } from "../components/Buttons/ActionButton"
import { MemoList } from "../components/MemoList/MemoList"


type Props = {};
export class MemoListScreen extends Component<Props> {
    handlePress = () => {
        this.props.navigation.navigate("MemoSeries")
    }
    render() {
        return (
            <View style={styles.container}>
                <MemoList></MemoList>
                <View style={styles.actionButton}>
                    <ActionButton backgroundColor={"red"} onPress={this.handlePress}></ActionButton>
                </View>
            </View>
        );
    }
}

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
