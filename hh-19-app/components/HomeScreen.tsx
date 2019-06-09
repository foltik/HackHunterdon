import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { fb, uid } from '../App'
import { SafeAreaView } from 'react-navigation';
import { Card } from 'react-native-elements';

export class HomeScreen extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    let eatenRef = fb.firestore().collection("users").doc(uid).collection("consumed");
    eatenRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState({ data: [...this.state.data, doc.data()] });
      });
    })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.data);
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center"}}>
        <Text style={{fontSize: 20}}>Here's what you've eaten today:</Text>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <Card><Text>{item.name}</Text></Card>}
        />
      </SafeAreaView>
    );
  }
}