import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Dimensions, Image, KeyboardAvoidingView } from 'react-native';
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
    }

    handleLogin() {
        fb.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.navigation.navigate('MainApp');
            })
            .catch(error => {
                alert("Login failed!");
            });
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, justifyContent: "center", alignItems: "center" }} behavior="padding" enabled>
                <Image source={require('../assets/foodlogo.png')} style={{ width: 300, height: 300, marginBottom: 50 }} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="gray"
                    textContentType="emailAddress"
                    autoCompleteType="email"
                    autoCapitalize="none"
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="gray"
                    textContentType="password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCompleteType="password"
                    onChangeText={text => this.setState({ password: text })}
                />
                <Button
                    title="Login"
                    onPress={this.handleLogin.bind(this)}
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'lightgray',
        width: Dimensions.get('window').width - 40,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        marginBottom: 20,
        borderRadius: 20,
        color: 'gray',
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