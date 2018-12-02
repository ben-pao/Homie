import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import GroceryScreen from '../screens/GroceryScreen';
import ChoresScreen from '../screens/ChoresScreen';
import AddChoreScreen from '../screens/AddChoreScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateHouseScreen from '../screens/CreateHouseScreen';
import JoinHouseScreen from '../screens/JoinHouseScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddPeopleScreen from '../screens/AddPeopleScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import AboutScreen from '../screens/AboutScreen';
import PaymentsScreen from '../screens/PaymentsScreen';

import React from 'react';

const LoginStack = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
    Welcome: WelcomeScreen,
    CreateHouse: CreateHouseScreen,
    JoinHouse: JoinHouseScreen,
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    AddPeople: AddPeopleScreen,
    Profile: ProfileScreen,
    About: AboutScreen
  },
  {
      navigationOptions: {
        header: null,
    }
  }
);

const ChoresStack = createStackNavigator(
  {
    Chores: ChoresScreen,
    AddChore: AddChoreScreen
  },
  {
      navigationOptions: {
        header: null,
    }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Groceries: GroceryScreen,
    Chores: ChoresStack,
    Payments: PaymentsScreen,
    Settings: SettingsStack,
  },
  {
    tabBarOptions: {
      activeBackgroundColor: 'hotpink',
      activeTintColor: '#000',
      inactiveTintColor: '#fff',
      inactiveBackgroundColor: '#000',
      style: {
        backgroundColor: '#000',
      },
      labelStyle: {
        fontFamily: 'Cochin',
      },
      showLabel: false,
    },
    // https://expo.github.io/vector-icons/
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          iconName = 'ios-home';
        }
        else if (routeName === 'Groceries'){
          // iconName = 'ios-basket';
          iconName = 'ios-cart';
        }
        else if (routeName === 'Chores'){
          // iconName = 'ios-list';
          iconName = `ios-list${focused ? '-box' : ''}`;
        }
        else if (routeName === 'Payments') {
          iconName = 'ios-card';
        }
        else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
          // iconName = 'ios-settings';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
  }
);

const AppStack = createStackNavigator(
  {
    TabNav: TabNavigator,
    Settings: SettingsStack,
  },
  {
    // initialRouteName: 'TabNavigator',
    navigationOptions: {
      headerStyle: {
        // backgroundColor: '#FF69B4',
        backgroundColor: '#000',
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
      // headerTintColor: '#000',
      headerTitleStyle: {
        // fontWeight: 'bold',
        // font: 'cambria'
        fontFamily: 'Cochin',
      },
      gesturesEnabled: false,
      headerTitle: "HOMIE"
    },
  }
);

// // From https://reactnavigation.org/docs/en/navigation-options-resolution.html
// TabNavigator.navigationOptions = ({ navigation }) => {
//   const { routeName } = navigation.state.routes[navigation.state.index];
//
//   // You can do whatever you like here to pick the title based on the route name
//   const headerTitle = 'HOMIE';
//
//   return {
//     headerTitle,
//   };
// };

const StackNavigator = createStackNavigator(
  {
    Login: LoginStack,
    App: AppStack,
  },
  {
    initialRouteName: 'Login',
    // initialRouteName: 'App', // Skip Login page (for testing)
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    }
  }
);

export default StackNavigator;
