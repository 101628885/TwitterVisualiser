/**
|--------------------------------------------------
| Crime Filter Component
| - ??????????????????
|--------------------------------------------------
*/

import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Body,
  Button,
  CheckBox,
  Icon,
  ListItem
} from "native-base";
import {
  Constants,
  Font
} from 'expo';
import { Dialog } from 'react-native-simple-dialogs';

export default class CrimeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      fontLoaded: false,
      dialogVisible: false,
      categories: [
        { name: "Assault", checked: true },
        { name: "Murder", checked: true },
        { name: "Kidnapping", checked: true },
        { name: "Extortion", checked: true },
        { name: "Rape", checked: true },
        { name: "Theft", checked: true },
        { name: "Burglary", checked: true },
        { name: "Vandalism", checked: true },
        { name: "Drugs", checked: true }
      ]
    };
  }

  // Part of the react lifecyle
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  toggleChecked(categoryName) {
    const categories = this.state.categories;

    for (var i = 0; i < categories.length; i++) {
      if (categories[i].name === categoryName) {
        categories[i].checked = !categories[i].checked;
      }
    }

    this.setState({ categories, });
  }

  renderCheckBoxes() {
    return (
      this.state.categories.map(category => (
        <ListItem key={category.name}>
          <CheckBox 
            checked={category.checked} 
            onPress={() => this.toggleChecked(category.name)} 
          />
          <Body>
            <Text style={style.categoryLabelStyle}>{category.name}</Text>
          </Body>
        </ListItem>
      ))
    );
  }

  onClickOK() {
    this.setState({ dialogVisible: false });
    this.props.handleClick(this.state.categories);
  }

  render() {
    return (
      <View>
        <Button transparent onPress={() => this.setState({ dialogVisible: true })}>
          <Icon name='md-more' />
        </Button>
        {/* TODO: create own custom alert component, react-native-simple-dialogs component is slow */}
        <Dialog 
          visible={this.state.dialogVisible} 
          title='Filter'
          onTouchOutside={() => this.setState({ dialogVisible: false })}>
          <View>
            <ScrollView style={style.scrollViewStyle}>
              {this.renderCheckBoxes()}
            </ScrollView>
            <View style={style.buttonContainerStyle}>
              <Button transparent onPress={() => this.setState({ dialogVisible: false })}>
                <Text style={style.buttonTextStyle}>CANCEL</Text>
              </Button>
              <Button transparent onPress={() => this.onClickOK()}>
                <Text style={style.buttonTextStyle}>OK</Text>
              </Button>
            </View>
          </View>
        </Dialog>
      </View>
    );
  }
}

// Define styles for this component
const style = StyleSheet.create({
  categoryLabelStyle: {
    marginLeft: 15
  },
  buttonContainerStyle: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 35
  },
  buttonTextStyle: {
    color: '#2196F3',
    fontWeight: 'bold'
  },
  scrollViewStyle: {
    height: (Dimensions.get('window').height - Constants.statusBarHeight) / 1.5
  }
});
