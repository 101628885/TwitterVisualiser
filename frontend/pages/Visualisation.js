/**
|--------------------------------------------------
| Visualisation page
| D3 Implementation page
|--------------------------------------------------
*/

import React, { Component } from 'react';
import { 
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Body,
  Left,
  Right,
  View,
  Text,
  H2
} from 'native-base';
import { 
  Font, 
  MapView,
  Constants
} from 'expo';
import Pie from 'react-native-pie';

export default class Home extends React.Component {
        constructor(props) {
            super(props);
            this.state = { 
              crimes: 0,
              not_crimes: 0,
              fontLoaded: false,
              dataLoaded: false
            };
          }

        static navigationOptions = {
            drawerIcon: (
                <Icon name="pie" style={{ color: "#0084b4" }} />
            )
        }

        async generatePieChart() {
          var crime_tweets = 0;
          var not_crime_tweets = 0;

          await fetch('http://144.6.226.34:3000/stefansPieChartEndPoint/1000')
            .then(res => res.json())
            .then(tweetData => {
              this.setState({dataLoaded: true});
              for (let tweet of tweetData) {
                if (tweet.crime == true) {
                  crime_tweets++;
                } else {
                  not_crime_tweets++;
                }
              }
              this.setState({crimes: (crime_tweets / 10), not_crimes: (not_crime_tweets / 10)});
            });
        }

        // Part of the react lifecyle
        async componentWillMount() {
            await Expo.Font.loadAsync({
                'Roboto': require('native-base/Fonts/Roboto.ttf'),
                'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            });
            this.setState({ fontLoaded: true });
            this.generatePieChart();
        }

        render() {
          const r = 85
          const innerR = 50

            return (
                this.state.fontLoaded && this.state.dataLoaded ?
                    <Container style={style.container}>
                    <View style={style.statusBar} />
                        <Header>
                            <Left>
                                <Button
                                    transparent
                                    onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                                    <Icon name="menu" />
                                </Button>
                            </Left>
                            <Body>
                                <Title>Visualisation</Title>
                            </Body>
                            <Right>
                              <Button
                                transparent
                                onPress={() => this.generatePieChart()}>
                                <Icon name="refresh" />
                              </Button>
                            </Right>
                        </Header>
                          <View style = { style.charts }>
                            <View style = {style.leftSide}>
                              <H2 style = { style.title }>Crime Tweets</H2>

                              <View>
                                <Pie
                                  radius={r}
                                  innerRadius={innerR}
                                  series={[this.state.crimes, this.state.not_crimes]}
                                  colors={['#0f0', '#f00']}
                                />

                                <View style={style.gauge}>
                                  <Text style={style.gaugeText}>{this.state.crimes}%</Text>
                                </View>
                              </View>
                            </View>

                            <View style={style.rightSide}>
                              <H2 style = { style.title }>NLP</H2>

                              <View>
                                <Pie
                                  radius={r}
                                  innerRadius={innerR}
                                  series={[5, 95]}
                                  colors={['#0f0', '#f00']}
                                />

                                <View style={style.gauge}>
                                  <Text style={style.gaugeText}>5%</Text>
                                </View>
                              </View>
                            </View>
                          </View>

                          
                    </Container>
                    :
                    <View style={style.mb}>
                        <ActivityIndicator />
                    </View>
            )
        }
}

const style = StyleSheet.create({
    container: {
      backgroundColor: "#2196F3"
    },
    title: {
      fontStyle: 'italic',
      color: '#FFF',
    },
    charts: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    pieChart: {
      textAlign: 'left'
    },
    leftSide: {
      alignItems: 'center',
      marginLeft: Dimensions.get('window').width * 0.02
    },
    rightSide: {
      alignItems: 'center',
      marginRight: Dimensions.get('window').width * 0.02
    },
    gauge: {
      position: 'absolute',
      width: (Dimensions.get('window').width / 2) - (Dimensions.get('window').width * 0.01),
      height: ((Dimensions.get('window').height / 2) / 2) - (Dimensions.get('window').width * 0.01),
      alignItems: 'center',
      justifyContent: 'center',
    },
    gaugeText: {
      backgroundColor: 'transparent',
      fontSize: 25,
    },
    statusBar: {
      marginTop: Constants.statusBarHeight,
    }
})