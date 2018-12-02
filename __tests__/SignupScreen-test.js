import 'react-native';
import React from 'react';
import SignupScreen, {nameIsNull} from '../screens/SignupScreen';
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
    <SignupScreen />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('well formatted first and last name should be pass', () => {
  const tree = renderer.create(
    <SignupScreen />
  );
  firstname = "Clayton";
  lastname = "Kershaw";
  const ret = tree.getInstance().nameIsNull(firstname, lastname);
  expect(ret).toBeFalsy();
});

test('null first name should be detected', () => {
  const tree = renderer.create(
    <SignupScreen />
  );
  firstname = null;
  lastname = "Wilson";
  const ret = tree.getInstance().nameIsNull(firstname, lastname);
  expect(ret).toBeTruthy();
});

test('empty first name should be detected', () => {
  const tree = renderer.create(
    <SignupScreen />
  );
  firstname = "";
  lastname = "Bangerz";
  const ret = tree.getInstance().nameIsNull(firstname, lastname);
  expect(ret).toBeTruthy();
});


test('null last name should be detected', () => {
  const tree = renderer.create(
    <SignupScreen />
  );
  firstname = "Smokey";
  lastname = null;
  const ret = tree.getInstance().nameIsNull(firstname, lastname);
  expect(ret).toBeTruthy();
});


test('empty last name should be detected', () => {
  const tree = renderer.create(
    <SignupScreen />
  );
  firstname = "Abbi";
  lastname = "";
  const ret = tree.getInstance().nameIsNull(firstname, lastname);
  expect(ret).toBeTruthy();
});

test('matching passwords should pass', () => {
  const tree = renderer.create(
    <SignupScreen />
  );
  password = "123456";
  confirm_password = "123456";
  const ret = tree.getInstance().passwordDontMatch(password, confirm_password);
  expect(ret).toBeFalsy();
});

test('mismatching passwords should be detected', () => {
  const tree = renderer.create(
    <SignupScreen />
  );
  password = "123456";
  confirm_password = "Don't steal my pizza codddamnittt";
  const ret = tree.getInstance().passwordDontMatch(password, confirm_password);
  expect(ret).toBeTruthy();
});
