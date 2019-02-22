/**
 * @flow
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */


import React, { Component } from 'react';
import {name as appName} from './app.json';
import {
    AppRegistry,
    StyleSheet,
    ToastAndroid,
    Button,
    View
} from 'react-native';

const a: number = 'a'

console.log(a)

import QRCodeScanner from 'react-native-qrcode-scanner';

class ScanScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false
        }
    }

    render() {
        return (
            <View>
                {this.state.isOpen && <QRCodeScanner
                    cameraProps={{
                        captureAudio: false
                    }}
                onRead={e => {
                    this.setState({ isOpen: false })
                    ToastAndroid.show(e.data, ToastAndroid.SHORT);
                }}
            />}
                { !this.state.isOpen && <Button onPress={() => this.setState({isOpen: true})} title={"open"}/>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});

AppRegistry.registerComponent(appName, () => ScanScreen);
