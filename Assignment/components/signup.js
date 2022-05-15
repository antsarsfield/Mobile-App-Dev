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

class SignUpScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "hello123"
        };
    }

    signup = () => {
        fetch('http://192.168.1.63:3333/api/1.0.0/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
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
        return (
            <View>
                <Text>Sign Up</Text>
                <TextInput
                    placeholder="First Name"
                    onChangeText={(firstname) => this.setState({ firstname })}
                    value={this.state.firstname}
                /><TextInput
                    placeholder="Last Name"
                    onChangeText={(lastname) => this.setState({ lastname })}
                    value={this.state.lastname}
                />
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
                    title="Sign Up"
                    onPress={() => this.signup()}
                />
            </View>
        );
    }
}

export default SignUpScreen;