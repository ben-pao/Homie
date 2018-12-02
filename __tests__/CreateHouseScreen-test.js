import 'react-native';
import React from 'react';
import CreateHouseScreen from '../screens/CreateHouseScreen';
// import
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <CreateHouseScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
