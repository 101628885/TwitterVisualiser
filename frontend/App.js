import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import CrimeTweets from './pages/CrimeTweets';
import { DrawerNavigator } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return (
      <MyApp />
    );
  }
}

const MyApp = DrawerNavigator ({
  ShowTweets: {
    screen: CrimeTweets
  }
})