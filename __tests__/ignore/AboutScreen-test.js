import 'react-native';
import React from 'react';
import AboutScreen from '../screens/AboutScreen';
// import
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <AboutScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
