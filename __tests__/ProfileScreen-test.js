import 'react-native';
import React from 'react';
import ProfileScreen from '../screens/ProfileScreen';
// import
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <ProfileScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
