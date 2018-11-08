// __tests__/Example-test.js (from Intro-test.js)
import 'react-native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
// import 
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('works', () => {
  expect(1).toBe(1);
});

test('renders correctly', () => {
  const tree = renderer.create(
    <HomeScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
