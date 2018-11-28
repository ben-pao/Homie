import 'react-native';
import React from 'react';
import JoinHouseScreen from '../screens/JoinHouseScreen';
// import
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <JoinHouseScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
