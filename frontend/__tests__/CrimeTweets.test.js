import React from 'react';
import CrimeTweets from '../pages/CrimeTweets';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<CrimeTweets />).toJSON();
  expect(rendered).toBeTruthy();
});

// import React from 'react';
// import { View } from 'react-native';
// import { shallow } from 'enzyme';
// import CrimeTweets from '../pages/CrimeTweets';

// import renderer from 'react-test-renderer';

// describe('Testing CrimeTweets page', () => {
//   const defaultState = {
//     dataLoaded: false,
//     fontLoaded: false,
//     showToast: false,
//     tweetAmount: "10"
//   };

//   beforeEach(() => {
//     wrapper = shallow(<CrimeTweets />);
//   });

//   it('has default state', () => {
//     expect(wrapper.state()).toEqual(defaultState);
//   });
// });
