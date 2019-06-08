import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export class ScanScreen extends Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Scanning is my favorite pastime</Text>
        </View>
      );
    }
  }