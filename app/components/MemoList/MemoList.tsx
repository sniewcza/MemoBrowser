import React from "react";
import { MemoListItem } from "./MemoListItem"
import { FlatList, View } from "react-native"
const datas = [
    'Simon Mignolet',
    'Nathaniel Clyne',
    'Dejan Lovren',
    'Mama Sakho',
    'Alberto Moreno',
    'Emre Can',
    'Joe Allen',
    'Phil Coutinho',
    'Mama Sakho',
    'Alberto Moreno',
    'Emre Can',
    'Joe Allen',
    'Phil Coutinho'
];

export class MemoList extends React.Component<{}, {}>{
    _renderItem = ({ item }) => {
        return (
            < MemoListItem data={item} ></MemoListItem >
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={datas}
                    renderItem={this._renderItem}
                    keyExtractor={item => Math.random().toString()}
                >
                </FlatList>
            </View>
        )
    }
}