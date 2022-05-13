import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class HomeScreen extends Component {
    render() {
        const nav = this.props.navigation
        return (

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button title="About" onPress={() => nav.navigate("About")} />
            </View>
        );
    }
}

export default HomeScreen;