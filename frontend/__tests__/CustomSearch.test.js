import React from 'react';
import { shallow } from 'enzyme';
import CustomSearch from '../pages/CustomSearch';

describe('Testing CustomSearch component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <CustomSearch action={this.changeTweetAmount} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});