import { Provider } from "react-redux";
import React from "react";
import { AppRegistry } from "react-native";
import App from "./app/config/Router";
import { store } from "./app/store/configureStore";
import { name as appName } from "./app.json";
import Icon from "react-native-vector-icons/Ionicons";
Icon.loadFont();

const connectedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => connectedApp);
