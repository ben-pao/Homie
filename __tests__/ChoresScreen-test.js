import 'react-native';
import React from 'react';
import ChoresScreen from '../screens/ChoresScreen';
// import
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <ChoresScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
