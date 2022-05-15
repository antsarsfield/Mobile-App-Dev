import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
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

const getToken = async (done) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@spacebook_auth')
        const data = JSON.parse(jsonValue);
        return done(data);
    } catch (e) {
        console.error(e);
    }
}

const getFriend = async (done) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@spacebook_friends')
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

const storeFriends = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@spacebook_friends', jsonValue)
    } catch (e) {
        console.error(error);
    }
}

class UserInfoScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_info: {},
            login_info: {},
            friend_info: [{}],
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
        getToken((data) => {
            this.setState({
                login_info: data,
                isLoading: false
            });
        });
        getFriend((data) => {
            this.setState({
                friend_info: data,
                isLoading: false
            });
        });
    }

    updateUserInfo = () => {
        fetch('http://192.168.1.63:3333/api/1.0.0/user/' + this.state.user_info.user_id, {
            method: 'PATCH',
            headers: {
                'X-Authorization': this.state.login_info
            },
            body: JSON.stringify({
                first_name: this.state.user_info.first_name,
                last_name: this.state.user_info.last_name,
                email: this.state.user_info.email,
                password: this.state.user_info.password
            })
        })

            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                storeData(json);
                //     this.props.navigation.navigate("UserInfo");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getFriends = () => {
        fetch('http://192.168.1.63:3333/api/1.0.0/user/' + this.state.login_info.id + '/friends', {
            headers: {
                'X-Authorization': this.state.login_info
            },
        })
            .then((response) => response.json([]))
            .then((json) => {
                console.log(json);
                storeFriends(json);
                this.props.navigation.navigate("UserInfo");
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
                <>
                    <View>
                        <Text style={styles.formLabel}>Login id: {this.state.user_info.user_id}</Text>
                        <Text style={styles.formLabel}>First Name: {this.state.user_info.first_name}</Text>
                        <Text style={styles.formLabel}>Last Name: {this.state.user_info.last_name}</Text>
                        <Text style={styles.formLabel}>Email: {this.state.user_info.email}</Text>
                    </View>
                    <View>
                        <TextInput style={styles.formInput}>First Name: {this.state.user_info.first_name}</TextInput>
                        <TextInput style={styles.formInput}>Last Name: {this.state.user_info.last_name}</TextInput>
                        <TextInput style={styles.formInput}>Email: {this.state.user_info.email}</TextInput>
                        <TextInput secureTextEntry={true} style={styles.formInput}>Email: {this.state.user_info.password}</TextInput>
                        <Button style={styles.formTouch} title="Update Information" onPress={() => this.updateUserInfo()} />
                    </View>
                    <View>
                        <Button style={styles.formTouch} title="View Friends" onPress={() => this.getFriends()} />
                        <Text style={styles.formLabel}>You Have: {this.state.friend_info.length} Friends</Text>
                    </View>
                </>
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
    formInput: {
        borderWidth: 1,
        borderColor: 'lightblue',
        borderRadius: 5
    },
})

export default UserInfoScreen;