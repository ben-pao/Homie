import 'react-native';
import React from 'react';
import RequestPaymentsScreen from '../screens/RequestPaymentsScreen';
// import
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <RequestPaymentsScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
