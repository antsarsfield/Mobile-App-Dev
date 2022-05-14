import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@spacebook_details', jsonValue)
    } catch (e) {
        console.error(error);
    }
}

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "jj@mmu.ac.uk",
            password: "hello123"
        };
    }

    login = () => {
        fetch('http://192.168.1.63:3333/api/1.0.0/login', {
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
                this.props.navigation.navigate("Feed");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View>
                <Text>Login</Text>
                <TextInput
                    placeholder="Enter email"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    placeholder="Enter password"
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Button
                    title="Login"
                    onPress={() => this.login()}
                />
            </View>
        );
    }
}

export default LoginScreen;