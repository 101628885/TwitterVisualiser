import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import CrimeTweets from '../pages/CrimeTweets';

import renderer from 'react-test-renderer';

describe('Testing CrimeTweets page', () => {
  const defaultState = {
    dataLoaded: false,
    fontLoaded: false,
    showToast: false,
    tweetAmount: "10"
  };

  test('renders correctly', () => {
    const snapshot = renderer.create(<CrimeTweets />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  beforeEach(() => {
    wrapper = shallow(<CrimeTweets />);
  });

  it('has default state', () => {
    expect(wrapper.state()).toEqual(defaultState);
  });
});
