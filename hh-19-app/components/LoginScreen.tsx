import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Dimensions } from 'react-native';
import { AuthNavigator } from '../App'
import { fb } from '../App'

export class LoginScreen extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    state = {
        email: "",
        password: "",
        login: false,
    }

    handleLogin() {
        this.setState({ login: true });
        fb.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            this.props.navigation.navigate('MainApp');
        })
        .catch(error => {
            this.setState({ login: false })
            alert("Login failed!");
        });
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
                    onPress={this.handleLogin.bind(this)}
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