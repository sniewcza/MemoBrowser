import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { CheckBox } from "../CheckBox/CheckBox"
import moment from "moment"

interface Props {
    name: string;
    creationDate: number;
    photosCount: number;
    style: ViewStyle
    deletionMode: boolean
    checked?: boolean
}

export class MemoListItem extends React.PureComponent<Props> {
    render() {
        return (
            < View  {...this.props}>
                {this.props.deletionMode && <View style={styles.withRightMargin}><CheckBox checked={this.props.checked} /></View>}
                {this.props.name.length > 0 && <View style={styles.nameContainer} >
                    <Text style={styles.text} numberOfLines={1}>{this.props.name}</Text>
                </View>}

                <Text style={styles.date}>{moment(this.props.creationDate).format("DD-MM-YYYY")}</Text>
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
    date: {
        color: "black",
        overflow: "hidden"
    },
    metadata: {
        flexDirection: "row",
        marginLeft: 'auto',
    },
    nameContainer: {
        maxWidth: "50%"
    },
    withRightMargin: {
        marginRight: 5
    }
})