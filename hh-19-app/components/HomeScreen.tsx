import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { fb, uid } from '../App'
import { SafeAreaView } from 'react-navigation';
import { Card, Text } from 'react-native-elements';

export class HomeScreen extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    let eatenRef = fb.firestore().collection("users").doc(uid).collection("consumed");
    eatenRef.onSnapshot((querySnapshot) => {
      this.setState({ data: [] });
      querySnapshot.forEach((doc) => {
        this.setState({ data: [...this.state.data, doc.data()] });
      });
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <Text h1>Hello!</Text>
        <Card title="Here's what you've eaten today:">
          <FlatList
            data={this.state.data}
            renderItem={({ item }) =>
              <Card><Text>{item.name}</Text></Card>
            }
          />
        </Card>
      </SafeAreaView>
    );
  }
}