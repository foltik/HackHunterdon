import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Dimensions } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export class ScanScreen extends Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    _handleRead = result => {
        Alert.alert(
            "Wowie here's your message pal",
            result,
            [
                {text: "OK"},
            ]
        );
    };

    render() {
        return (
            <View>
            <BarCodeScanner
                  onBarCodeRead={this._handleRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />
            </View>
        )
    }    
}
