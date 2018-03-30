/**
|--------------------------------------------------
| Home page
|--------------------------------------------------
*/

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
    H2,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Body,
    Left,
    Toast,
    Root,
    Right
} from "native-base";
import Font from 'expo';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dataLoaded: false, fontLoaded: false }
    }

    static navigationOptions = {
        drawerIcon: (
            <Icon name="home" style={{ color: "#0084b4" }} />
        )
    }

    // Part of the react lifecyle
    async componentDidMount() {
        // Use if server down
        // await fetch('https://testtwitter-diigzuppaq.now.sh/shanesAndCoreysSpecialEndPoint/10')
        await fetch('http://144.6.226.34:3000/shanesAndCoreysSpecialEndPoint/10')
            .then((res) => res.json())
            .then((resJson) => {
                this.setState({
                    dataLoaded: true,
                    dataSource: resJson,
                });
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

    render() {
        return (
            this.state.dataLoaded && this.state.fontLoaded ?
                <Container style={style.container}>
                    <Header>
                        <Left>
                            <Button
                                transparent
                                onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                                <Icon name="menu" />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: "#0084b4", alignSelf: 'center' }}>Home</Title>
                        </Body>
                        <Right />
                    </Header>
                        <View style = { style.titleView }>
                            <H2 style = { style.title }>Welcome to Twiiter Visualiser</H2>
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
        backgroundColor: "#0084b4",
    },
    mb: {
        marginBottom: 15,
        padding: 20,
    },
    title: {
        fontStyle: 'italic',
        color: '#FFF',
    },
    titleView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})