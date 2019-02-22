/**
 * @flow
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { name as appName } from "./app.json";
import { StyleSheet, AppRegistry, ToastAndroid, View } from "react-native";
import { Button } from "teaset";
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
      <View style={styles.container}>
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
            size={"lg"}
            type={"primary"}
            title={"Scan"}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    padding: 20
  }
});

AppRegistry.registerComponent(appName, () => ScanScreen);
