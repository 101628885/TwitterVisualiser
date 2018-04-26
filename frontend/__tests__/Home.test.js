import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Home from '../pages/Home';

describe('Home', () => {
  it('renders correctly', () => {
    const output = shallow(
      <Home />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
