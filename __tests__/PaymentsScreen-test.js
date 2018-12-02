import 'react-native';
import React from 'react';
import PaymentsScreen from '../screens/PaymentsScreen';
// import
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <PaymentsScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
