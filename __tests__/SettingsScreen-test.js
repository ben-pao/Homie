import 'react-native';
import React from 'react';
import SettingsScreen from '../screens/SettingsScreen';
// import
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <SettingsScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
