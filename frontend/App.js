import React from 'react';
import { 
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
import Font from 'expo';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { dataLoaded: false, fontLoaded: false, showToast: false}
  }

  // Part of the react lifecyle
  async componentDidMount(){
    // TODO: Edit for custom search sizes
    await fetch('http://144.6.226.34:3000/shanesAndCoreysSpecialEndPoint/10')
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

  render(){
    return (
      this.state.dataLoaded && this.state.fontLoaded ? 
      // Root required for Toast rendering
      <Root>
        <Container style = { style.container }>
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
              <Title style = {{ color: "#FFF" }}>Crime Tweets</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress = {() => this.componentDidMount()}>
                <Icon style = {{ color: "#FFF" }} name="refresh" />
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
      </Root>
        :
        <View style={style.mb}>
          <ActivityIndicator/>
        </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#0084b4"
   },
   mb: {
     marginBottom: 15,
     padding: 20,
   }
})