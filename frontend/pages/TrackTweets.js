import React from 'react';
import { 
  ActivityIndicator,
  StatusBar,
  StyleSheet
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
  Root,
  View,
  Text,
  Thumbnail
} from 'native-base';
import { Font, MapView } from 'expo';

export default class TrackTweets extends React.Component {
  constructor(props) { 
    super(props); 
    this.state = {
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
  }

  static navigationOptions = {
    drawerIcon: (
      <Icon name='locate' style={{ color: '#0084b4' }}/>
    )
  };

  renderMarkers() {
    return (
      this.state.markers.map(marker => (<MapView.Marker 
        key={marker.id}
        coordinate={marker.latlng}
        title={marker.title}
        description={marker.description}
      />))
    );
  }

  geocodeLocation(query) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${this.state.apiKey}`)
    .then(res => {
      return res.json;
    });
  }

  // Fetch tweets from node endpoint and store in state
  generateMarkers() {
    // TODO: get data from node NLP server
    fetch('http://144.6.226.34:3000/shanesAndCoreysSpecialEndPoint/20')
    .then(res => res.json())
    .then(tweetData => {
      let markerArray = [];
      for (let tweet of tweetData) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${tweet.user_location}&key=${this.state.apiKey}`)
        .then(res => res.json())

        .then(locationData => this.setState({
          markers: [...this.state.markers, ({
            id: tweet.id,
            latlng: {
              latitude: locationData.results[0].geometry.location.lat,
              longitude: locationData.results[0].geometry.location.lng
            },
            title: tweet.user_name,
            description: tweet.full_text
          })]
        }));
      }
    });
  }

  // React lifecycle
  // Component is being created and inserted into the DOM
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({fontLoaded: true});
    this.generateMarkers();
  }

  // Render the page to the screen
  render() {
    return (
      this.state.fontLoaded ? (
        <Container style={styles.containerStyle}>
          <View style={{ height: StatusBar.currentHeight, backgroundColor: '#2196F3' }} />
          <Header style={{ backgroundColor: '#2196F3' }}>
            {/* Still needs proper drawer implementation */}
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
          </Header>
          <Content style={{ flex: 1, alignSelf: 'stretch' }}>
            <MapView
              style={{ height: 560 }}  // TODO: get height dynamically
              region={this.state.region}
            >
              {this.renderMarkers()}
            </MapView>    
          </Content>
        </Container>
      ) : (
        <View style = {styles.mbStyle}>
          <ActivityIndicator />
        </View>
      )
    );
  }
}
    
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#FFF'
  },
  mbStyle: {
    marginBottom: 15,
    padding: 20,
  }
})
