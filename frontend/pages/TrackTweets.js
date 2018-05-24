/**
|--------------------------------------------------
| Tracking tweets through Map API
| For now..
|--------------------------------------------------
*/

import React from 'react';
import CrimeFilter from './CrimeFilter'
import { 
  ActivityIndicator,
  Dimensions,
  StatusBar,
  StyleSheet
} from 'react-native';
import {
  ActionSheet,
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
  View,
} from 'native-base';
import { 
  Constants,
  Font, 
  MapView
} from 'expo';

export default class TrackTweets extends React.Component {
  /**
   * Default constructor for the TrackTweets class component
   * Initialises state
   * 
   * @param {object} props
   */
  constructor(props) { 
    super(props); 
    this.updateMarkers = this.updateMarkers.bind(this);
    this.state = {
      markers: [],
      tweets: [],
      dataLoaded: false,
      fontLoaded: false,
      region: {
        latitude: -37.81361,
        longitude: 144.96305,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      },
      apiKey: 'AIzaSyB8BoNj8oknFsfTBWhNdAFTiMhI9Gkz8e8'
    };
  }

  static navigationOptions = {
    drawerIcon: (
      <Icon name='locate' style={{ color: '#0084b4' }}/>
    )
  };

  /**
   * renderMarkers() returns a list of markers (i.e. pins) to display on a MapView component
   * 
   * @return {object} (JSX)
   */
  renderMarkers() {
    return (
      this.state.markers.map(marker => (
        <MapView.Marker 
          /**
           * TODO: get tweet id from endpoint to use as element key
           * I'm only using this super scuffed implementation so the 
           * debugger will shut up about non-indexed elements
           */
          key={Math.floor(Math.random() * Math.floor(99999))} 
          coordinate={{
            latitude: marker.location.latitude,
            longitude: marker.location.longitude
          }}
          title={marker.type_of_crime}
          description={marker.full_text}
        >
          <MapView.Callout>
            <View style={{ width: 300 }}>
              <Text>Category: {marker.type_of_crime}</Text>
              <Text note>{marker.full_text}</Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
      ))
    );
  }

  /**
   * updateMarkers() updates the state with based on objects in passed-in categories array
   * 
   * @param {array} categoryFilter 
   */
  updateMarkers(categoryFilter) {
    const tweets = this.state.tweets;
    checkedMarkers = [];

    for (i = 0; i < tweets.length; i++) {
      if (categoryFilter.length == 0) {
        checkedMarkers.push({
          full_text: tweets[i].full_text,
          type_of_crime: tweets[i].type_of_crime,
          location: tweets[i].location[0]
        });
      } else {
        for (j = 0; j < categoryFilter.length; j++) {
          if (tweets[i].type_of_crime == categoryFilter[j].name.toLowerCase() && categoryFilter[j].checked == true)  {
            checkedMarkers.push({
              full_text: tweets[i].full_text,
              type_of_crime: tweets[i].type_of_crime,
              location: tweets[i].location[0]
            });
            break;
          }
        }
      }
    }

    this.setState({ markers: checkedMarkers });
  }

  /**
   * loadData() fetches tweet data from node endpoint to store in state
   */
  async loadData() {
    await fetch('http://144.6.226.34:3000/nlpTrainingEndpoint/40/true')
      .then(res => res.json())
      .then(tweetData => {
        this.setState({ 
          tweets: tweetData, 
          dataLoaded: true 
        });
        this.updateMarkers([]);
      })
      .catch((error) => {
        console.error(error); 
      });
  }

  /**
   * React lifecycle callback method
   * Called when Component is being created and inserted into the DOM
   */
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({fontLoaded: true});
    this.loadData();
  }

  /**
   * render() renders the component to the screen
   */
  render() {
    return (
      this.state.dataLoaded && this.state.fontLoaded ? (
        <Container style={style.containerStyle}>
          <View style={style.statusBar} />
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate('DrawerOpen')}
              >
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>Track Tweets</Title>
            </Body>
            <Right>
              <CrimeFilter handleClick={this.updateMarkers} />
            </Right>
          </Header>
          <Content style={{ flex: 1, alignSelf: 'stretch' }}>
            {/* TODO: use d3.js for map visualisation */}
            <MapView
              style={style.mapStyle}
              region={this.state.region}
            >
              {this.renderMarkers()}
            </MapView>    
          </Content>
        </Container>
      ) : (
        <View style = {style.mbStyle}>
          <ActivityIndicator />
        </View>
      )
    );
  }
}

// Define styles for this component
const style = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#2196F3'
  },
  mbStyle: {
    marginBottom: 15,
    padding: 20,
  },
  statusBar: {
    marginTop: Constants.statusBarHeight
  },
  mapStyle: {
    height: Dimensions.get('window').height - Constants.statusBarHeight,
    width: Dimensions.get('window').width
  }
});
