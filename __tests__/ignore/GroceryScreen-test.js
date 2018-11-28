import 'react-native';
import React from 'react';
import GroceryScreen from '../screens/GroceryScreen';
// import
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <GroceryScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
