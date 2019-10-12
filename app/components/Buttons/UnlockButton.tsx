import React from "react"
import { Animated } from "react-native";
import { IconButton } from "./IconButton"
import { transform } from "@babel/core";

interface Props {
    animated: boolean
    onPress: () => void
}

export class UnlockButton extends React.PureComponent<Props> {
    animatedScale = new Animated.Value(1)
    componentDidMount() {
        if (this.props.animated) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(this.animatedScale, {
                        toValue: 1.3,
                        duration: 1000,
                        delay: 500,
                        useNativeDriver: true
                    }),
                    Animated.timing(this.animatedScale, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true
                    })
                ])).start()
        }
    }
    render() {
        return (
            <Animated.View style={{ transform: [{ scale: this.animatedScale }] }}>
                <IconButton iconName="md-lock" iconSize={100} color="blue" onPress={this.props.onPress}></IconButton>
            </Animated.View >
        )
    }
}