/**
|--------------------------------------------------
| Custom Search page
| - Custom tweet search size
|--------------------------------------------------
*/
import React from 'react';
import {
  Text,
  View
} from 'react-native';
import {
  Button,
  Icon,
  ActionSheet
} from "native-base";
import {
  Font,
  Constants
} from 'expo';

var BUTTONS = ["10", "20", "30", "Cancel"];
var CANCEL_INDEX = 3;
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
      <View>
        <Button transparent
          onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                title: "Select Amount of Tweets"
              },
              buttonIndex => {
                if (buttonIndex === 3) {
                  return;
                }
                else {
                  this.setState({
                    tweetValue: BUTTONS[buttonIndex],
                  }, () => this.props.action(this.state.tweetValue));
                }
              }
            )}
        >
          <Icon name="ios-list-box" />
        </Button>
      </View>
    )
  }
}