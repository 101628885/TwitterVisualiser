import React from 'react';
import { shallow } from 'enzyme';
import TrackTweets from '../pages/TrackTweets';
import { Content } from 'native-base';

import renderer from 'react-test-renderer';

describe('Testing TrackTweets page', () => {
  const defaultState = {
    markers: [],
    fontLoaded: false,
    region: {
      latitude: -37.81361,
      longitude: 144.96305,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    apiKey: 'AIzaSyB8BoNj8oknFsfTBWhNdAFTiMhI9Gkz8e8'
  };

  test('renders correctly', () => {
    const snapshot = renderer.create(<TrackTweets />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  beforeEach(() => {
    wrapper = shallow(<TrackTweets />);
  });

  it('has default state', () => {
    expect(wrapper.state()).toEqual(defaultState);
  });
});
