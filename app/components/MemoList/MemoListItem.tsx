import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

interface Props {
    name: string;
    photosCount: number;
    style: ViewStyle
}

export class MemoListItem extends React.PureComponent<Props> {
    render() {
        return (
            < View style={this.props.style} {...this.props} >
                <Text style={styles.text}>{this.props.name}</Text>
                <View style={styles.metadata}>
                    <Text style={styles.text}>{this.props.photosCount}</Text>
                    <Icon name='md-document' size={20} color="#6e7177"></Icon>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: "black",
        marginRight: 5
    },
    metadata: {
        flexDirection: "row",
        marginLeft: 'auto',
    },
})