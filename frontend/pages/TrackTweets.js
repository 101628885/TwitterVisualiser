import React from 'react';
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
  Text
} from 'native-base';
import { 
  Font, 
  MapView,
  Constants
} from 'expo';

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

  // Return a list of map markers based on tweet data
  renderMarkers() {
    return (
      this.state.markers.map(marker => (
        <MapView.Marker 
          key={marker.id}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
        >
          <MapView.Callout>
            <View style={{ width: 300 }}>
              <Text>{marker.title}</Text>
              <Text note>{marker.description}</Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
      ))
    );
  }

  // Fetch tweets from node endpoint and generate map markers to store in state
  generateMarkers() {
    // TODO: Get data from node NLP server
    // TODO: Edit for custom search sizes
    fetch('http://144.6.226.34:3000/shanesAndCoreysSpecialEndPoint/20')
    .then(res => res.json())
    .then(tweetData => {
      let markerArray = [];
      for (let tweet of tweetData) {
        // generate and store a marker in state for each element in tweetData
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${tweet.user_location}&key=${this.state.apiKey}`)
        .then(res => res.json())
        .then(locationData => this.setState({
          // strange javascript witchcraft for upating state
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
        <Container style={style.containerStyle}>
        <View style={style.statusBar} />
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

// Define styles for this component/page
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
})