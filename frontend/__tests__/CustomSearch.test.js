import React from 'react';
import CustomSearch from '../pages/CustomSearch';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<CustomSearch />).toJSON();
  expect(rendered).toBeTruthy();
});