import React from "react"
import { TouchableOpacity, View, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

interface Props {
    onPress: () => any
    color?: string
}

export class DeletePhotoHeaderButton extends React.PureComponent<Props>{
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.container}>
                    <Icon name="md-trash" size={30} color={this.props.color || "red"}></Icon>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginRight: 20
    }
})