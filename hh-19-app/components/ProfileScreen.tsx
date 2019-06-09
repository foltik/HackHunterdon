import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements'
import { fb, uid } from '../App'

export class ProfileScreen extends Component {
    state = {
        name: "",
        age: 0,
        sex: "",
        weight: 0,
    }

    componentDidMount() {
        let userRef = fb.firestore().collection("users").doc(uid);
        userRef.get().then((doc) => {
            if (doc.exists) {
                console.log(doc.data());
                this.setState({ name: doc.data().name, age: doc.data().age, sex: doc.data().sex, weight: doc.data().weight });
            }
            else {
                console.log("Document doesn't exist!");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Card><Text>Name: {this.state.name}</Text></Card>
                <Card><Text>Age: {this.state.age}</Text></Card>
                <Card><Text>Sex: {this.state.sex}</Text></Card>
                <Card><Text>Weight: {this.state.weight}</Text></Card>
            </View>
        );
    }
}