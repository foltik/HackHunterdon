import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Dimensions, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { fb, uid } from '../App'

export class ScanScreen extends Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    _handleRead = ({ type, data }) => {
        this.setState({ scanned: true });
        let foodRef = fb.firestore().collection("food").doc(data);
        foodRef.get().then((doc) => {
            if (doc.exists) {
                alert(`'${doc.data().name}' has been added!`);
            }
            else {
                alert("Scanned code is not a food item");
            }
        })
        .catch(() => {
            alert(`Error adding food item from ${data}`);
        });
    };

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this._handleRead}
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned && (
                    <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
                )}
            </View>
        );
    }
}
