import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import AntDesign from "react-native-vector-icons/AntDesign";
import { HomeScreen } from "./components/HomeScreen";
import { ScanScreen } from "./components/ScanScreen";
import { AnalyticsScreen } from "./components/AnalyticsScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { LoginScreen } from "./components/LoginScreen";
import * as firebase from 'firebase';
import 'firebase/firestore';

// putting our firebase api key in version control lol
const firebaseConfig = {
  apiKey: "AIzaSyCAFoqGmYGnJSrTgVmdZksYX4jttrlWTTY",
  authDomain: "hackhunterdon-46b25.firebaseapp.com",
  databaseURL: "https://hackhunterdon-46b25.firebaseio.com",
  projectId: "hackhunterdon-46b25",
  storageBucket: "hackhunterdon-46b25.appspot.com",
  messagingSenderId: "281804663834",
  appId: "1:281804663834:web:5973ef7002fff5d6"
};

export let fb = firebase.initializeApp(firebaseConfig);

export let uid = null;

fb.auth().onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.
    uid = user.uid;
  } else {
    // User not logged in or has just logged out.
    uid = null;
  }
});

const MainNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Scan: { screen: ScanScreen },
    Analytics: { screen: AnalyticsScreen },
    Profile: { screen: ProfileScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = AntDesign;
        let iconName: string;
        if (routeName === 'Home') {
          iconName = 'home';
        }
        else if (routeName === 'Profile') {
          iconName = `user`;
        }
        else if (routeName === "Scan") {
          iconName = "qrcode";
        }
        else if (routeName === "Analytics") {
          iconName = "linechart";
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    })
  }
);

export const AuthNavigator = createSwitchNavigator(
  {
    Auth: LoginScreen,
    MainApp: MainNavigator,
  }
);

const App = createAppContainer(AuthNavigator);

export default App;

