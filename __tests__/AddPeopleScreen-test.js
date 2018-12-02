import 'react-native';
import React from 'react';
import AddPeopleScreen from '../screens/AddPeopleScreen';
// import
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <AddPeopleScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('adding a person with their email should pass', () => {
  const tree = renderer.create(
    <AddPeopleScreen />
  );
  email = "turkeyNroll@gmail.com";
  const ret = tree.getInstance().emailNotNull(email);
  expect(ret).toBeTruthy();
});

test('adding a person with null email should be detected', () => {
  const tree = renderer.create(
    <AddPeopleScreen />
  );
  email = null;
  const ret = tree.getInstance().emailNotNull(email);
  expect(ret).toBeFalsy();
});

test('adding a person with empty email should be detected', () => {
  const tree = renderer.create(
    <AddPeopleScreen />
  );
  email = "";
  const ret = tree.getInstance().emailNotNull(email);
  expect(ret).toBeFalsy();
});
