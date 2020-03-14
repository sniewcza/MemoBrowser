import React, { FC } from "react"
import { IconButton } from "./IconButton"
import Animated, { Value, Easing } from "react-native-reanimated"
import { loop, bInterpolate } from "react-native-redash"
const { useCode, set } = Animated

interface Props {
    animated: boolean
    onPress: () => void
    color?: string
}

export const UnlockButton: FC<Props> = props => {
    const animationValue = new Value(0)
    const scale = bInterpolate(animationValue, 1, 1.3)
    props.animated && useCode(() => set(animationValue, loop({ duration: 1000, easing: Easing.inOut(Easing.linear), boomerang: true })), [animationValue])
    return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <IconButton iconName="md-lock" iconSize={100} color={props.color || "blue"} onPress={props.onPress}></IconButton>
        </Animated.View >
    )
}
