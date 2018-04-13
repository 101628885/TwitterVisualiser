/**
|--------------------------------------------------
| Visualisation page
| D3 Implementation page
|--------------------------------------------------
*/

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
  Text,
  H2
} from 'native-base';
import { 
  Font, 
  MapView,
  Constants
} from 'expo';

export default class Home extends React.Component {
        constructor(props) {
            super(props);
            this.state = { fontLoaded: false }
        }

        static navigationOptions = {
            drawerIcon: (
                <Icon name="pie" style={{ color: "#0084b4" }} />
            )
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
                this.state.fontLoaded ?
                    <Container style={style.container}>
                    <View style={style.statusBar} />
                        <Header>
                            <Left>
                                <Button
                                    transparent
                                    onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                                    <Icon name="menu" />
                                </Button>
                            </Left>
                            <Body>
                                <Title style={{ alignSelf: 'center' }}>Visualisation</Title>
                            </Body>
                            <Right />
                        </Header>
                            <View style = { style.titleView }>
                                <H2 style = { style.title }>Visualisation</H2>
                            </View>
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
    title: {
        fontStyle: 'italic',
        color: '#FFF',
    },
    titleView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusBar: {
        marginTop: Constants.statusBarHeight,
    }
})