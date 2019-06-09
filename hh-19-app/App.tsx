import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import AntDesign from "react-native-vector-icons/AntDesign";
import { HomeScreen } from "./components/HomeScreen";
import { ScanScreen } from "./components/ScanScreen";
import { AnalyticsScreen } from "./components/AnalyticsScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { LoginScreen } from "./components/LoginScreen";

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

const AuthNavigator = createSwitchNavigator(
  {
    Auth: LoginScreen,
    App: MainNavigator,
  }
);

const App = createAppContainer(AuthNavigator);

export default App;

