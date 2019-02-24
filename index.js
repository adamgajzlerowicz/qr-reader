/**
 * @flow
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from "react";
import { name as appName } from "./app.json";
import {
  StyleSheet,
  AppRegistry,
  Button,
  ToastAndroid,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";

const styles = StyleSheet.create({
  button: {
    width: "100%"
  },

  scroll: {
    width: "100%"
  },

  heading: {
    fontSize: 50,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
    marginBottom: 24
  },

  drive: {
    fontSize: 24,
    textAlign: "left",
    width: "100%"
  },

  container: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    width: "100%",
    padding: 20
  }
});

type StateType = {
  isOpen: boolean,
  drives: string[]
};

class ScanScreen extends React.Component<{}, StateType> {
  state = {
    isOpen: false,
    drives: []
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isOpen && (
          <View>
            <QRCodeScanner
              cameraProps={{
                captureAudio: false
              }}
              onRead={e => {
                this.setState({
                  isOpen: false,
                  drives: [e.data, ...this.state.drives]
                });
                ToastAndroid.show(e.data, ToastAndroid.SHORT);
              }}
            />
            <Button
              onPress={() => this.setState({ isOpen: false })}
              title={"Cancel"}
            />
          </View>
        )}

        {!this.state.isOpen && (
          <View style={styles.container}>
            <Text style={styles.heading}>Previous drives:</Text>

            <ScrollView centerContent={false} style={styles.scroll}>
              {this.state.drives.map((drive, index) => (
                <Text key={index} style={styles.drive}>
                  {drive}
                </Text>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.button}>
              <Button
                onPress={() => this.setState({ isOpen: true })}
                title={"Scan"}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

AppRegistry.registerComponent(appName, () => ScanScreen);
