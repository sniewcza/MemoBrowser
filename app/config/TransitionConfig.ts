import { Easing, Animated } from "react-native";
import { NavigationTransitionProps, TransitionConfig } from "react-navigation"

export const transitionConfig = (): TransitionConfig => {
    return {
        transitionSpec: {
            duration: 400,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: (sceneProps: NavigationTransitionProps) => {
            const { layout, position, scene, scenes } = sceneProps

            const thisSceneIndex = scene.index

            if (scenes.length > 1) {
                if (scene.route.routeName === "MemoSeriesDetails") {
                    const opacity = position.interpolate({
                        inputRange: [thisSceneIndex - 1, thisSceneIndex],
                        outputRange: [0, 1],
                    })
                    const scale = position.interpolate({
                        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                        outputRange: [4, 1, 1]
                    })
                    return { opacity, transform: [{ scale }] }
                }
                if (scene.route.routeName === "MemoSeries") {
                    const translateX = position.interpolate({
                        inputRange: [thisSceneIndex - 1, thisSceneIndex],
                        outputRange: [layout.initWidth, 0],
                    })
                    return { transform: [{ translateX }] }
                }
                if (scene.route.routeName === "Settings") {
                    const translateY = position.interpolate({
                        inputRange: [thisSceneIndex - 1, thisSceneIndex],
                        outputRange: [layout.initHeight, 0],
                    })
                    return { transform: [{ translateY }] }
                }
            }
        },
    }
}