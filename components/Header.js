//import libraries for compoenet
import React from 'react';
import {Text} from 'react-native';
import * as firebase from 'firebase';
import { createStackNavigator, StackNavigator } from 'react-navigation';

//make a component
const Header = () =>{
	const{textStyle } = styles;

	return(
		<View>	
			<Text style>{textStyle}> Albums!</Text>
		</View>
	);
};

const styles={
	viewStyle:{
		backgroundColor: '#F8F8F8'
	}
	textStyle: {
		fontSize:20;

	}
}

export default Header;

