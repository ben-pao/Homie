import 'react-native';
import React from 'react';
import ChargesPaymentsScreen from '../screens/ChargesPaymentsScreen';
// import
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <ChargesPaymentsScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
