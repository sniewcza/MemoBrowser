import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import React from "react"
import { MemoListScreen } from "../screens/MemoListScreen"
import secondScreen from "../screens/SecondScreen"
import { MemoSeriesPreviewScreen } from "../screens/MemoSeriesPreview"
import Icon from "react-native-vector-icons/Ionicons"
import { MemoSeriesDetails } from "../screens/MemoSeriesDetails"
const tabNavigator = createBottomTabNavigator({
    First: {
        screen: MemoListScreen,
        navigationOptions: {
            title: "Memos",
            tabBarIcon: () => <Icon name={"md-list-box"} size={30}></Icon>
        }
    },
    Second: secondScreen,

})

const routeNavigator = createStackNavigator({
    Default: {
        screen: tabNavigator,

    },
    MemoSeries: {
        screen: MemoSeriesPreviewScreen,
    },
    MemoSeriesDetails: {
        screen: MemoSeriesDetails
    }
})
export default createAppContainer(routeNavigator);