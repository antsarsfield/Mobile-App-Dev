import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (done) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@spacebook_details')
        const data = JSON.parse(jsonValue);
        return done(data);
    } catch (e) {
        console.error(e);
    }
}

class UserInfoScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_info: {},
            isLoading: true
        }
    }

    componentDidMount() {
        getData((data) => {
            this.setState({
                user_info: data,
                isLoading: false
            });
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View><Text>Loading...</Text></View>
            )
        } else {
            console.log("here", this.state);
            return (
                <View>
                    <Text>Login id: {this.state.user_info.id}</Text>
                    <Text>First Name: {this.state.user_info.first_name}</Text>
                    <Text>Last Name: {this.state.user_info.last_name}</Text>
                    <Text>Email: {this.state.user_info.email}</Text>
                </View>
            );
        }
    }
}

export default UserInfoScreen;