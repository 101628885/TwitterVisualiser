/**
|--------------------------------------------------
| Crime Filter Component
| - ??????????????????
|--------------------------------------------------
*/

import React from 'react';
import {
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
      assaultChecked: true,
      rapeChecked: true,
      theftChecked: true,
      burglaryChecked: true,
      vandalismChecked: true,
      drugsChecked: true
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

  render() {
    return (
      <View>
        <Button transparent onPress={() => this.setState({ dialogVisible: true })}>
          <Icon name='md-funnel' />
        </Button>
        <Dialog 
          visible={this.state.dialogVisible} 
          title='Filter'
          onTouchOutside={() => this.setState({ dialogVisible: false })}>
          <View>
            {/* I know this doesn't look very good-code-reusing-practices-like
                Since NativeBase checkboxes require manually setting the checked state
                If you can find a way to make these checkboxes non-painfully autogenerate 
                Please go ahead */}
            <ListItem>
              <CheckBox 
                checked={this.state.assaultChecked} 
                onPress={() => this.setState({ assaultChecked: !this.state.assaultChecked })} 
              />
              <Body>
                <Text style={style.categoryLabelStyle}>Assault</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox 
                checked={this.state.rapeChecked} 
                onPress={() => this.setState({ rapeChecked: !this.state.rapeChecked })} 
              />
              <Body>
                <Text style={style.categoryLabelStyle}>Rape</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox 
                checked={this.state.theftChecked} 
                onPress={() => this.setState({ theftChecked: !this.state.theftChecked })} 
              />
              <Body>
                <Text style={style.categoryLabelStyle}>Theft</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox 
                checked={this.state.burglaryChecked} 
                onPress={() => this.setState({ burglaryChecked: !this.state.burglaryChecked })} 
              />
              <Body>
                <Text style={style.categoryLabelStyle}>Burglary</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox 
                checked={this.state.vandalismChecked} 
                onPress={() => this.setState({ vandalismChecked: !this.state.vandalismChecked })} 
              />
              <Body>
                <Text style={style.categoryLabelStyle}>Vandalism</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox 
                checked={this.state.drugsChecked} 
                onPress={() => this.setState({ drugsChecked: !this.state.drugsChecked })} 
              />
              <Body>
                <Text style={style.categoryLabelStyle}>Drugs</Text>
              </Body>
            </ListItem>
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
  }
});
