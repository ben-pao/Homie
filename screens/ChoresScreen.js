import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class ChoresScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View>

        <Text>CHORES PAGE </Text>

      </View>
    );
  }
}
