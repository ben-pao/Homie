//import libraries for compoenet
import React from 'react';
import {Text, View} from 'react-native';
import * as firebase from 'firebase';
import { createStackNavigator, StackNavigator } from 'react-navigation';

//make a component
const Header = () =>{
	const{textStyle, viewStyle } = styles;

	return(
		<View style={styles.viewStyle}>	
			<Text style>{styles.textStyle}> Albums!</Text>
		</View>
	);
};

const styles={
	viewStyle:{
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems: 'center',
		height:60,
		paddingTop:15,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2}, //how far the shadow extends
		shadowOpacity: 0.2 //how bright or dark the shadow is
	},
	textStyle: {
		fontSize: 20

	}
};

export default Header;

