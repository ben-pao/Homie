import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import GroceryScreen from '../screens/GroceryScreen';
import ChoresScreen from '../screens/ChoresScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateHouseScreen from '../screens/CreateHouseScreen';
import JoinHouseScreen from '../screens/JoinHouseScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddPeopleScreen from '../screens/AddPeopleScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import AboutScreen from '../screens/AboutScreen';
import BillsScreen from '../screens/BillsScreen';

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

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Groceries: GroceryScreen,
    'Chore Wheel': ChoresScreen,
    Bills: BillsScreen,
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
    }
  }
);

const AppStack = createStackNavigator(
  {
    TabNavigator
  },
  {
    initialRouteName: 'TabNavigator',
    navigationOptions: {
      title: 'Homie',
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
    },
  }
);

// From https://reactnavigation.org/docs/en/navigation-options-resolution.html
TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  // You can do whatever you like here to pick the title based on the route name
  const headerTitle = routeName;

  return {
    headerTitle,
  };
};

const StackNavigator = createStackNavigator(
  {
    Login: LoginStack,
    App: AppStack,
  },
  {
    // initialRouteName: 'Login',
    initialRouteName: 'App', // Skip Login page (for testing)
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    }
  }
);

export default StackNavigator;
