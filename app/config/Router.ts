import { createAppContainer, createStackNavigator } from 'react-navigation';
import { MemoListScreen } from "../screens/MemoListScreen"
import { MemoSeriesPreviewScreen } from "../screens/MemoSeriesPreview"
import { MemoSeriesDetails } from "../screens/MemoSeriesDetails"
import { Color } from "./ColorTheme"

const routeNavigator = createStackNavigator({
    Default: {
        screen: MemoListScreen,
        navigationOptions: {
            title: "Your Memos",
            headerStyle: {
                backgroundColor: Color.primary,
            },
            headerTitleStyle: {
                color: Color.onPrimary
            },
            headerTintColor: Color.onPrimary
        }
    },
    MemoSeries: {
        screen: MemoSeriesPreviewScreen,
        navigationOptions: {
            title: "Memo Series",
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
    }
}, {
        headerMode: "screen",
        headerLayoutPreset: "center",

    })
export default createAppContainer(routeNavigator);