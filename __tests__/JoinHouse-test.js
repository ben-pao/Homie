import 'react-native';
import React from 'react';
import JoinHouseScreen from '../screens/JoinHouseScreen';
// import
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// Mock alert()
alert = jest.fn().mockImplementation(() => {
  return {
    alert: "alert!"
  };
});

test('renders correctly', () => {
  const tree = renderer.create(
    <JoinHouseScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('joining house with house ID should pass', () => {
  const tree = renderer.create(
    <JoinHouseScreen />
  );
  state = {
    houseID: "TRAP HAAAS",
    housemateEmail: ""
  }
  const ret = tree.getInstance().badInput(state);
  expect(ret).toBeFalsy();
});

test('joining house with housemates email should pass', () => {
  const tree = renderer.create(
    <JoinHouseScreen />
  );
  state = {
    houseID: "",
    housemateEmail: "yg400@gmail.com"
  }
  const ret = tree.getInstance().badInput(state);
  expect(ret).toBeFalsy();
});

test('joining house with no input should be detected', () => {
  const tree = renderer.create(
    <JoinHouseScreen />
  );
  state = {
    houseID: "",
    housemateEmail: ""
  }
  const ret = tree.getInstance().badInput(state);
  expect(ret).toBeTruthy();
});

test('joining house with both a house ID and an email should be detected', () => {
  const tree = renderer.create(
    <JoinHouseScreen />
  );
  state = {
    houseID: "keith",
    housemateEmail: "hohoho"
  }
  const ret = tree.getInstance().badInput(state);
  expect(ret).toBeTruthy();
});
