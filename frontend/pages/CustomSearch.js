/**
|--------------------------------------------------
| Custom Search page
| - Custom tweet search size
|--------------------------------------------------
*/
import React from 'react';
import {
  Text,
  StyleSheet,
  View
} from 'react-native';
import {
  Picker,
  Content,
  Button,
  Icon
} from "native-base";
import {
  Font,
  Constants
} from 'expo';

export default class CustomSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false, tweetValue: "10" };
  }
  // Part of the react lifecyle
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  //This function gets called when a picker value is selected
  //Changes selected values' state, and calls the function that was passed to it.
  changeTweetValue(value) {
    this.setState({
      tweetValue: value,
    }, () => this.props.action(this.state.tweetValue));
  }

  //returns a view with a button that opens a dialog to change the tweets
  render() {
    return (
      <View style={{ borderWidth: 0 }}>
        <Button transparent>
          <Icon name="ios-list-box" />
        </Button>
        <Picker
          mode="dialog"
          placeholder="Choose tmount of tweets"
          placeholderStyle={{ color: "#2874F0" }}
          note={false}
          style={style.pickerStyle}
          selectedValue={this.state.tweetValue}
          onValueChange={this.changeTweetValue.bind(this)}
          prompt="Choose amount of tweets"
        >
          <Picker.Item label="10 tweets" value="10" />
          <Picker.Item label="20 tweets" value="20" />
          <Picker.Item label="30 tweets" value="30" />
        </Picker>
      </View>
    )
  }
}

const style = StyleSheet.create({
  pickerStyle: {
    position: 'absolute',
    top: 0,
    width: 1000,
    height: 1000,
  },
})
