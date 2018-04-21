/**
|--------------------------------------------------
| Crime Tweets page
| - Loads crime related tweets.
|--------------------------------------------------
*/

import React from 'react';
import CustomSearch from './CustomSearch'
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
    constructor(props){
        super(props);
        this.state = { dataLoaded: false, fontLoaded: false, showToast: false, tweetAmount: "10"}
        this.changeTweetAmount = this.changeTweetAmount.bind(this);
      }

      static navigationOptions = {
        drawerIcon: (
          <Icon name = "logo-twitter" style = {{ color: "#0084b4" }}/>
        )
      }
    
      // Part of the react lifecyle
      async componentDidMount(){
        //await fetch('https://testtwitter-diigzuppaq.now.sh/shanesAndCoreysSpecialEndPoint/10')
        await fetch('http://144.6.226.34:3000/shanesAndCoreysSpecialEndPoint/' + this.state.tweetAmount)
          .then((res) => res.json())
          .then((resJson) => {
            this.setState({
              dataLoaded: true,
              dataSource: resJson,
            }, () => Toast.show({
              text: "Tweets loaded",
              position: "bottom",
              buttonText: "Okay",
              type: "success"
            }));
          })
          .catch((error) =>{
            console.error(error);
          });
      }
      
      
      // Part of the react lifecyle
      async componentWillMount(){
        await Expo.Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({fontLoaded: true});
      }
      //
      changeTweetAmount(value)
      {
        this.setState({
          tweetAmount: value
        }),
        this.componentDidMount()
      }

      render(){
        return (
          this.state.dataLoaded && this.state.fontLoaded ? 
            <Container style = { style.container }>
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
                  <CustomSearch action={this.changeTweetAmount}/>
                  <Button
                    transparent
                    onPress = {() => this.componentDidMount()}>
                    <Icon name="refresh" />
                  </Button>
                </Right>
              </Header>
              <Content padder>
                  <FlatList
                    data = { this.state.dataSource }
                    renderItem = { ({item}) => 
                    <View>
                      <Card style = { style.mb }>
                        <CardItem header>
                          <Text>{item.created_at}{"\n"}{item.user_location}</Text>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text>{item.full_text}</Text> 
                          </Body>
                        </CardItem>
                        <CardItem footer>
                            <Text>{item.user_name}</Text>
                        </CardItem>
                      </Card>
                    </View>
                    }
                    keyExtractor = { (item, index) => index }
                  />
              </Content>
            </Container>
          :
            <View style = { style.mb }>
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