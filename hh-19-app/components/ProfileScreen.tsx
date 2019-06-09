import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fb, uid } from '../App'

export class ProfileScreen extends Component {
    render() {
        console.log(fb);
        let userRef = fb.firestore().collection("users").doc(uid);
        let data = null;
        userRef.get().then((doc) => {
            if (doc.exists) {
                console.log(doc.data());
            }
            else {
                console.log("Document doesn't exist!");
            }
        })
        .catch(error => {
            console.log(error);
        });
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>An Error has occurred</Text>
            </View>
        );
    }
}