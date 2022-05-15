import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInfoScreen from './userInfo';


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

const storeToken = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@spacebook_auth', jsonValue)
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
                storeToken(this.state.login_info.token);
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
                'X-Authorization': this.state.login_info.token
            },
        })
        this.props.navigation.navigate("Login");
    }

    render() {
        const token = this.state.login_info.token;
        if (this.state.isLoading) {
            return (
                <View><Text>Loading...</Text></View>
            )
        } else {
            console.log("here", this.state);
            return (
                <View>
                    <Text style={styles.formLabel}>Login id: {this.state.login_info.id}</Text>
                    <Text style={styles.formLabel}>Login token: {this.state.login_info.token}</Text>
                    <Button style={styles.formTouch} title="get profile" onPress={() => this.getUserInfo()} />
                    <Button style={styles.formTouch} title="logout" onPress={() => this.logout()} />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    formLabel: {
        fontSize: 15,
        color: 'steelblue'
    },
    formTouch: {
        backgroundColor: 'lightblue',
        padding: 10,
        alignItems: 'center'
    },

})

export default FeedScreen;