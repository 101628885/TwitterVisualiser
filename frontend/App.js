/**
|--------------------------------------------------
| App.js
| - Contains logic for all action.
| - Pretty much the 'main' file.
|--------------------------------------------------
*/

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Visualisation from './pages/Visualisation';
import CrimeTweets from './pages/CrimeTweets';
import TrackTweets from './pages/TrackTweets';
import Home from './pages/Home';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { Container, Header, Body, Icon, H2, Root } from 'native-base';

export default class App extends React.Component {
  render() {
    return (
      // Root allows for toasts
      <Root>
        <MyApp />
      </Root>
    );
  }
}

// Allows for logo and other edits above drawer links
const CustomDrawerContentComponent = (props) => (
  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Image
          style={styles.drawerIcon}
          source={require('./assets/logo/logo-5.png')}
        />
        <H2 style={styles.drawerTitle}>Mohan Bois</H2>
      </Body>
    </Header>
    <DrawerItems {...props} />
  </Container>
);

// Drawer Navigation logicß
const MyApp = DrawerNavigator({
  'Home': {
    screen: Home
  },
  'Show Tweets': {
    screen: CrimeTweets
  },
  'Track Tweets': {
    screen: TrackTweets
  },
  'Visualisation': {
    screen: Visualisation
  }
}, {
    initialRouteName: 'Home',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoue: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
});

styles = StyleSheet.create({
  drawerIcon: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  drawerHeader: {
    height: 200,
    backgroundColor: '#0084b4'
  },
  drawerTitle: {
    fontStyle: 'italic',
    color: '#FFF'
  }
});
