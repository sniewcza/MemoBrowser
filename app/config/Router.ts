import { createAppContainer, createStackNavigator } from 'react-navigation';
import { MemoListScreen } from "../screens/MemoListScreen"
import { MemoSeriesPreviewScreen } from "../screens/MemoSeriesPreview"
import { MemoSeriesDetails } from "../screens/MemoSeriesDetails"
import { SettingsScreen } from "../screens/SettingsScreen"
import { Color } from "./ColorTheme"
import { transitionConfig } from "./TransitionConfig"
import { appStrings } from "./Strings"
const routeNavigator = createStackNavigator({
    Default: {
        screen: MemoListScreen,
        navigationOptions: {
            title: appStrings.memoScreenTitle,
            headerStyle: {
                backgroundColor: Color.primary,
            },
            headerTitleStyle: {
                color: Color.onPrimary
            },
            headerTintColor: Color.onPrimary,
        }
    },
    MemoSeries: {
        screen: MemoSeriesPreviewScreen,
        navigationOptions: {
            title: appStrings.memoSeriesScreenTitle,
            headerStyle: {
                backgroundColor: Color.primary,
            },
            headerTitleStyle: {
                color: Color.onPrimary
            },
            headerTintColor: Color.onPrimary
        }
    },
    MemoSeriesDetails: {
        screen: MemoSeriesDetails,
        navigationOptions: {
            headerStyle: {
                backgroundColor: Color.primary,
            },
            headerTitleStyle: {
                color: Color.onPrimary
            },
            headerTintColor: Color.onPrimary
        }
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            title: appStrings.settingsScreenTitle,
            headerStyle: {
                backgroundColor: Color.primary,
            },
            headerTitleStyle: {
                color: Color.onPrimary
            },
            headerTintColor: Color.onPrimary,

        }
    }
}, {
        headerMode: "screen",
        headerLayoutPreset: "center",
        transitionConfig: transitionConfig

    })

export default createAppContainer(routeNavigator);