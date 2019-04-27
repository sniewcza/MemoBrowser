/**
 * @format
 */
import { Provider } from "react-redux"
import React from "react"
import { AppRegistry } from 'react-native';
import App from './app/config/Router';
import { store } from "./app/store/configureStore"
import { name as appName } from './app.json';

const connectedApp = () => (
    <Provider store={store}>
        <App></App>
    </Provider>
)

AppRegistry.registerComponent(appName, () => connectedApp);
