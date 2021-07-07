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

test('should be able to get todays date', () => {
  const tree = renderer.create(
    <ChoresScreen />
  );
  const ret = tree.getInstance().getTodayDate();
  console.log("Todya's date: " + ret);
  expect(ret).toBeDefined();
});
