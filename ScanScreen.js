/**
 * @flow
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  Card,
  Button,
  Snackbar,
  Headline,
  Paragraph
} from "react-native-paper";
import QRCodeScanner from "react-native-qrcode-scanner";

const styles = StyleSheet.create({
  card: {
    padding: 1
  },

  button: {
    width: "100%"
  },

  scroll: {
    width: "100%"
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
  },
  inner: {
    padding: 1,
    flex: 1,
    width: "100%",
    maxWidth: "100%"
  },
  cameraStyle: {
    width: "100%",
    maxWidth: "100%"
  },
  snack: {
    marginBottom: 20
  }
});

type DriveType = {
  date: string,
  description: string,
  startLocation: string,
  endLocation: string
};

type StateType = {
  isOpen: boolean,
  drives: DriveType[],
  showSuccess: boolean
};

class ScanScreen extends React.Component<{}, StateType> {
  state = {
    isOpen: false,
    drives: [],
    showSuccess: false
  };

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        {this.state.isOpen && (
          <View style={styles.inner}>
            <QRCodeScanner
              cameraProps={{
                captureAudio: false
              }}
              cameraStyle={styles.cameraStyle}
              onRead={e => {
                const item = JSON.parse(e.data);

                this.setState({
                  isOpen: false,
                  drives: [item, ...this.state.drives]
                });
                this.setState({ showSuccess: true });
              }}
            />

            <Button
              icon="add-a-photo"
              mode="contained"
              onPress={() => this.setState({ isOpen: false })}
            >
              <Text>Cancel</Text>
            </Button>
          </View>
        )}

        {!this.state.isOpen && (
          <View style={styles.inner}>
            <Headline>
              <Text>Your drives</Text>
            </Headline>

            <ScrollView centerContent={false} style={styles.scroll}>
              {this.state.drives.map((drive, index) => (
                <Card key={index} elevation={2} style={styles.card}>
                  <Card.Title title={drive.date} />
                  <Card.Content>
                    <Text style={styles.drive}>
                      {drive.startLocation} -> {drive.endLocation}
                    </Text>
                    <Paragraph>{drive.description}</Paragraph>
                  </Card.Content>
                </Card>
              ))}
            </ScrollView>
            {!this.state.showSuccess && (
              <TouchableOpacity style={styles.button}>
                <Button
                  icon="add-a-photo"
                  mode="contained"
                  onPress={() => this.setState({ isOpen: true })}
                >
                  <Text>Scan</Text>
                </Button>
              </TouchableOpacity>
            )}
          </View>
        )}
        <Snackbar
          style={styles.snack}
          visible={this.state.showSuccess}
          onDismiss={() => this.setState({ showSuccess: false })}
          action={{
            label: "OK",
            onPress: () => this.setState({ showSuccess: false })
          }}
        >
          <Text>Drive added</Text>
        </Snackbar>
      </View>
    );
  }
}

export default ScanScreen;
