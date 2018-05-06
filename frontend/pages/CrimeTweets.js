/**
|--------------------------------------------------
| Crime Tweets page
| - Loads crime related tweets.
|--------------------------------------------------
*/

import React from 'react';
import CustomSearch from './CustomSearch'
import CrimeFilter from './CrimeFilter'
import {
  StatusBar,
  FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Footer,
  Toast,
  Root
} from "native-base";
import {
  Font,
  Constants
} from 'expo';

export default class CrimeTweets extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataLoaded: false, fontLoaded: false, showToast: false, tweetAmount: "10", markers: [], tweets: [] }
    this.changeTweetAmount = this.changeTweetAmount.bind(this);
    this.updateMarkers = this.updateMarkers.bind(this);
  }

  static navigationOptions = {
    drawerIcon: (
      <Icon name="logo-twitter" style={{ color: "#0084b4" }} />
    )
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
          full_text: tweets[i].full_text.toString(),
          type_of_crime: tweets[i].type_of_crime.toString(),
          location: tweets[i].location[0].formattedAddress
        });
      } else {
        for (j = 0; j < categoryFilter.length; j++) {
          if (tweets[i].type_of_crime == categoryFilter[j].name.toLowerCase() && categoryFilter[j].checked == true)  {
            checkedMarkers.push({
              full_text: tweets[i].full_text.toString(),
              type_of_crime: tweets[i].type_of_crime.toString(),
              location: tweets[i].location[0].formattedAddress
            });
            break;
          }
        }
      }
    }

    this.setState({ markers: checkedMarkers });
  }


  // Part of the react lifecyle
  async componentDidMount() {
    //await fetch('https://testtwitter-diigzuppaq.now.sh/shanesAndCoreysSpecialEndPoint/10')
    await fetch('http://144.6.226.34:3000/getStoredTweets/' + this.state.tweetAmount + '/checked/false')
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({
          dataLoaded: true,
          tweets: resJson,
        }, () => Toast.show({
          text: this.state.tweetAmount + " Tweets loaded",
          position: "bottom",
          buttonText: "Okay",
          type: "success"
        }));
        this.updateMarkers([]);

      })
      .catch((error) => {
        console.error(error); 
      });
  }


  // Part of the react lifecyle
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  //Function that is passed to CustomSearch
  //Allows for CustomSearch to set the state of CrimeTweets within CustomSearch.
  changeTweetAmount(value) {
    this.setState({
      tweetAmount: value
    }, () => this.componentDidMount());
  }

  render() {
    return (
      this.state.dataLoaded && this.state.fontLoaded ?
        <Container style={style.container}>
          <View style={style.statusBar} />
          <Header>
            {/* Still needs proper drawer implementation */}
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>Crime Tweets</Title>
            </Body>
            <Right>
              <CrimeFilter handleClick={this.updateMarkers} />
              <CustomSearch action={this.changeTweetAmount} />
              <Button
                transparent
                onPress={() => this.componentDidMount()}>
                <Icon name="refresh" />
              </Button>
            </Right>
          </Header>
          <Content padder>
            <FlatList
              data={this.state.markers}
              renderItem={({ item }) =>
                <View>
                  <Card style={style.mb}>
                    <CardItem header>
                      <Text>{item.location}</Text>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Text>{item.full_text}</Text>
                      </Body>
                    </CardItem>
                    <CardItem footer>
                      <Text>Crime Type: {item.type_of_crime}</Text>
                    </CardItem>
                  </Card>
                </View>
              }
              keyExtractor={(item, index) => index}
            />
          </Content>
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
    backgroundColor: "#2196F3",
  },
  mb: {
    marginBottom: 15,
    padding: 20,
  },
  statusBar: {
    marginTop: Constants.statusBarHeight,
  }
})