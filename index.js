/**
 * @flow
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { name as appName } from "./app.json";
import { AppRegistry, ToastAndroid, Button, View } from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";

class ScanScreen extends Component<{}, { isOpen: boolean }> {
  state = {
    isOpen: false
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {this.state.isOpen && (
          <QRCodeScanner
            cameraProps={{
              captureAudio: false
            }}
            onRead={e => {
              this.setState({ isOpen: false });
              ToastAndroid.show(e.data, ToastAndroid.SHORT);
            }}
          />
        )}
        {!this.state.isOpen && (
          <Button
            onPress={() => this.setState({ isOpen: true })}
            title={"open"}
          />
        )}
      </View>
    );
  }
}

AppRegistry.registerComponent(appName, () => ScanScreen);
