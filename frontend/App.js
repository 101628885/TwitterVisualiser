import React, { Component } from 'react';
import {  View, Text, Image, StyleSheet } from 'react-native';
import CrimeTweets from './pages/CrimeTweets';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { Container, Header, Body, Icon, H2 } from 'native-base';

export default class App extends React.Component {
  render() {
    return (
      <MyApp />
    );
  }
}

const CustomDrawerContentComponent = (props) => (
  <Container>
    <Header style = { styles.drawerHeader }>
      <Body>
        <Image 
          style = { styles.drawerIcon }
          source = { require('./assets/logo/logo-5.png') }
        />
      <H2 style = { styles.drawerTitle }>Mohan Bois</H2>
      </Body>
    </Header>
    <DrawerItems {...props}/>
  </Container>
)

const MyApp = DrawerNavigator ({
'Show Tweets': {
    screen: CrimeTweets
  }
}, {
    initialRouteName: 'Show Tweets',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoue: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
})

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
})