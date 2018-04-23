import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../App';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(
    <App />
  ).toJSON();
  expect(rendered).toBeTruthy();
});
