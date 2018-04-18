import React from 'react';
import NativeBase from 'native-base';
import ReactNavigation from 'react-navigation'
import App from '../App';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
