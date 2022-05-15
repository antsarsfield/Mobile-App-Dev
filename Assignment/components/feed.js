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

const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@spacebook_details', jsonValue)
    } catch (e) {
        console.error(error);
    }
}

class FeedScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login_info: {},
            isLoading: true
        }
    }

    componentDidMount() {
        getData((data) => {
            this.setState({
                login_info: data,
                isLoading: false
            });
        });
    }

    getUserInfo = () => {
        fetch('http://192.168.1.63:3333/api/1.0.0/user/' + this.state.login_info.id, {
            headers: {
                'X-Authorization': this.state.login_info.token
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                storeData(json);
                this.props.navigation.navigate("UserInfo");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    logout = () => {
        fetch('http://192.168.1.63:3333/api/1.0.0/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                storeData(json);
                this.props.navigation.navigate("Login");
            })
            .catch((error) => {
                console.error(error);
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
                    <Text>Login id: {this.state.login_info.id}</Text>
                    <Text>Login token: {this.state.login_info.token}</Text>
                    <Button title="get profile" onPress={() => this.getUserInfo()} />
                    <Button title="logout" onPress={() => this.logout()} />
                </View>
            );
        }
    }
}

export default FeedScreen;