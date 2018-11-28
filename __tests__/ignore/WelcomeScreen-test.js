import 'react-native';
import React from 'react';
import WelcomeScreen from '../screens/WelcomeScreen';
// import
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <WelcomeScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
