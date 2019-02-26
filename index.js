/**
 * @flow
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from "react";
import { name as appName } from "./app.json";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { createStore } from "redux";

import ScanScreen from "./ScanScreen";

const store = createStore(() => {});

export default function Main() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <ScanScreen />
      </PaperProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
