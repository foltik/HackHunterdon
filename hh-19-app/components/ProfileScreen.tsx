import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation';
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
            <SafeAreaView style={{ flex: 1, justifyContent: "center"}} behavior="padding" enabled>
                <Image source={require('../assets/profile.jpg')} style={{ width: 200, height: 200, marginBottom: 50, alignSelf: "center" }} />
                <View>
                <Card><Text style={{marginBottom: 0, marginTop: 0}}>Name: {this.state.name}</Text></Card>
                <Card><Text style={{marginBottom: 0, marginTop: 0}}>Age: {this.state.age}</Text></Card>
                <Card><Text style={{marginBottom: 0, marginTop: 0}}>Sex: {this.state.sex}</Text></Card>
                <Card><Text style={{marginBottom: 0, marginTop: 0}}>Weight: {this.state.weight}</Text></Card>
                </View>
            </SafeAreaView>
        );
    }
}