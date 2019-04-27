import { createAppContainer, createStackNavigator } from 'react-navigation';
import { MemoListScreen } from "../screens/MemoListScreen"
import { MemoSeriesPreviewScreen } from "../screens/MemoSeriesPreview"
import { MemoSeriesDetails } from "../screens/MemoSeriesDetails"

const routeNavigator = createStackNavigator({
    Default: {
        screen: MemoListScreen,
        navigationOptions: {
            title: "Your Memos"
        }
    },
    MemoSeries: {
        screen: MemoSeriesPreviewScreen,
        navigationOptions: {
            title: "Memo Series"
        }
    },
    MemoSeriesDetails: {
        screen: MemoSeriesDetails
    }
}, {
        headerMode: "screen"
    })
export default createAppContainer(routeNavigator);