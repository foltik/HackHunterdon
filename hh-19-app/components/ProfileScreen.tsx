import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fb, uid } from '../App'

export class ProfileScreen extends Component {
    render () {
        console.log(uid);
        let userRef = fb.firestore().collection("users").doc(uid);
        let data = null;
        userRef.get().then( (doc) => {
            if (doc.exists) {
                console.log(doc.data());
            }
            else {
                console.log("No document found!")
            }
        }
        )
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>The data from firebase is available. TODO: make a proper profile page</Text>
            </View>
        );
    }
}