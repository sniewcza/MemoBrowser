import React, { FC } from "react";
import { View, Text, StyleSheet, ViewStyle, Image } from "react-native"
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
    thumbnail: any
}

export const MemoListItem: FC<Props> = props => {

    return (
        < View  {...props}>
            {props.deletionMode && <View style={styles.withRightMargin}><CheckBox checked={props.checked} /></View>}
            <Image source={{ uri: props.thumbnail }} style={styles.thumbnail} />
            {props.name.length > 0 && <View style={styles.nameContainer} >
                <Text style={styles.text} numberOfLines={1}>{props.name}</Text>
            </View>}

            <Text style={styles.date}>{moment(props.creationDate).format("DD-MM-YYYY")}</Text>
            <View style={styles.metadata}>
                <Text style={styles.text}>{props.photosCount}</Text>
                <Icon name='md-document' size={20} color="#6e7177"></Icon>
            </View>
        </View >
    )
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
    thumbnail: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginRight: 5
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