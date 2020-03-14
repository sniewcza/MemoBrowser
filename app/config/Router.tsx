import { MemoListView } from "../screens/MemoListScreen"
import { MemoSeriesPreview } from "../screens/MemoSeriesPreview"
import { MemoSeriesDetails } from "../screens/MemoSeriesDetails"
import { SettingsScreen } from "../screens/SettingsScreen"
import { Color } from "./ColorTheme"
import { appStrings } from "./Strings"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, StackNavigationOptions, TransitionSpecs, CardStyleInterpolators, TransitionPresets } from "@react-navigation/stack"
import { View } from "react-native";

const rootStack = createStackNavigator()

const getDefaultScreenOptionsForTitle = (title: string): StackNavigationOptions => {
    return {
        title: title,
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
        <NavigationContainer >
            <rootStack.Navigator   >
                <rootStack.Screen
                    name="Main Screen"
                    component={MemoListView}
                    options={getDefaultScreenOptionsForTitle(appStrings.memoScreenTitle)}
                />
                <rootStack.Screen
                    name="Preview Screen"
                    component={MemoSeriesPreview}
                    options={getDefaultScreenOptionsForTitle(appStrings.memoSeriesScreenTitle)}
                />
                <rootStack.Screen
                    name="Details Screen"
                    component={MemoSeriesDetails}

                    options={({ route }) => ({
                        ...getDefaultScreenOptionsForTitle(route.params.memo.name),
                        gestureEnabled: true,
                        gestureDirection: "horizontal",
                        ...TransitionPresets.ScaleFromCenterAndroid
                    })}
                />
            </rootStack.Navigator>
        </NavigationContainer>
    )
}

export default routeNavigatior