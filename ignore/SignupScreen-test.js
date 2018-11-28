import 'react-native';
import React from 'react';
import SignupScreen from '../screens/SignupScreen';
// import
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <SignupScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
