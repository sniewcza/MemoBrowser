import { MemoListScreen } from "../screens/MemoListScreen"
import { MemoSeriesPreviewScreen } from "../screens/MemoSeriesPreview"
import { MemoSeriesDetails } from "../screens/MemoSeriesDetails"
import { SettingsScreen } from "../screens/SettingsScreen"
import { Color } from "./ColorTheme"
import { transitionConfig } from "./TransitionConfig"
import { appStrings } from "./Strings"

import React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack"

const Stack = createStackNavigator()


const getDefaultScreenOptionsForTitle = (title: string): StackNavigationOptions => {
    return {
        title: appStrings.memoScreenTitle,
        headerTitleAlign: "center",
        headerStyle: {
            backgroundColor: Color.primary,
        },
        headerTitleStyle: {
            color: Color.onPrimary
        },
        headerTintColor: Color.onPrimary
    }
}

const routeNavigatior = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen
                    name="List Screen"
                    component={MemoListScreen}
                    options={getDefaultScreenOptionsForTitle(appStrings.memoScreenTitle)}
                />
                <Stack.Screen
                    name="Preview Screen"
                    component={MemoSeriesPreviewScreen}
                    options={getDefaultScreenOptionsForTitle(appStrings.memoSeriesScreenTitle)}
                />
                <Stack.Screen
                    name="Details Screen"
                    component={MemoSeriesDetails}
                    options={getDefaultScreenOptionsForTitle('')}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

// const routeNavigator = createStackNavigator({
//     Default: {
//         screen: MemoListScreen,
//         navigationOptions: {
//             title: appStrings.memoScreenTitle,
//             headerStyle: {
//                 backgroundColor: Color.primary,
//             },
//             headerTitleStyle: {
//                 color: Color.onPrimary
//             },
//             headerTintColor: Color.onPrimary,
//         }
//     },
//     MemoSeries: {
//         screen: MemoSeriesPreviewScreen,
//         navigationOptions: {
//             title: appStrings.memoSeriesScreenTitle,
//             headerStyle: {
//                 backgroundColor: Color.primary,
//             },
//             headerTitleStyle: {
//                 color: Color.onPrimary
//             },
//             headerTintColor: Color.onPrimary
//         }
//     },
//     MemoSeriesDetails: {
//         screen: MemoSeriesDetails,
//         navigationOptions: {
//             headerStyle: {
//                 backgroundColor: Color.primary,
//             },
//             headerTitleStyle: {
//                 color: Color.onPrimary
//             },
//             headerTintColor: Color.onPrimary
//         }
//     },
//     Settings: {
//         screen: SettingsScreen,
//         navigationOptions: {
//             title: appStrings.settingsScreenTitle,
//             headerStyle: {
//                 backgroundColor: Color.primary,
//             },
//             headerTitleStyle: {
//                 color: Color.onPrimary
//             },
//             headerTintColor: Color.onPrimary,

//         }
//     }
// }, {
//         headerMode: "screen",
//         headerLayoutPreset: "center",
//         transitionConfig: transitionConfig

//     })

export default routeNavigatior