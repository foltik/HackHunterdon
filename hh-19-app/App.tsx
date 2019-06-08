import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';
import AntDesign from "react-native-vector-icons/AntDesign"

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>This is the home screen</Text>
      </View>
    );
  }
}

class ProfileScreen extends Component {
  render () {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>My name is Jacques I am a gigachad</Text>
      </View>
    );
  }
}

const MainNavigator = createBottomTabNavigator(
  {
    Home: {screen: HomeScreen},
    Profile: {screen: ProfileScreen},
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
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    })
  }
);

const App = createAppContainer(MainNavigator);

export default App;

