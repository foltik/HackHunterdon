import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Dimensions } from 'react-native';

export class LoginScreen extends Component {
    state = {
        email: "",
        password: "",
    }

    _handleLogin() {
        console.log(this.state.email);
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    textContentType="username"
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    textContentType="password"
                    onChangeText={text => this.setState({ password: text })}
                />
                <Button
                    title="Login"
                    onPress={this._handleLogin}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
      backgroundColor: 'gray',
      width: Dimensions.get('window').width - 40,
      height: 40,
      marginHorizontal: 20,
      paddingLeft: 45,
      borderRadius: 20,
      color: '#ffffff',
    },
    inputWrapper: {
      flex: 1,
    },
    inlineImg: {
      position: 'absolute',
      zIndex: 99,
      width: 22,
      height: 22,
      left: 35,
      top: 9,
    },
  });