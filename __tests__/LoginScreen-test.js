import 'react-native';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
// import
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <LoginScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
