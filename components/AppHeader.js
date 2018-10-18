import React from 'react';
import { Header } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { navigate, withNavigation } from 'react-navigation';
// import { withNavigation } from 'react-navigation';


const AppHeader = () => { // { headerText } === prop.headerText
  return (
    <Header
      leftComponent={{ icon: 'menu', color: '#fff', onPress: () => alert('Go')}}
       // this.props.navigate('Home')}}
      centerComponent={{ text: 'Homie', style: {color: 'white', fontSize: 20} }}
      rightComponent={{ icon: 'home', color: '#fff', onPress: () => alert('Dodgers') }}
      outerContainerStyles={{ backgroundColor: '#6B8E23'}}
    />
  )
};

export default AppHeader;
