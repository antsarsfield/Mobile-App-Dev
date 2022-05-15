import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
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
            first_name: "",
            last_name: "",
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
                first_name: this.state.first_name,
                last_name: this.state.last_name,
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
                <Text style={styles.formLabel}>Sign Up</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder="First Name"
                    onChangeText={(first_name) => this.setState({ first_name })}
                    value={this.state.first_name}
                /><TextInput
                    style={styles.formInput}
                    placeholder="Last Name"
                    onChangeText={(last_name) => this.setState({ last_name })}
                    value={this.state.last_name}
                />
                <TextInput
                    style={styles.formInput}
                    placeholder="Enter email"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.formInput}
                    placeholder="Enter password"
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Button
                    style={styles.formTouch}
                    title="Sign Up"
                    onPress={() => this.signup()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    formLabel: {
        fontSize: 15,
        color: 'steelblue'
    },
    formInput: {
        borderWidth: 1,
        borderColor: 'lightblue',
        borderRadius: 5
    },
    formTouch: {
        backgroundColor: 'lightblue',
        padding: 10,
        alignItems: 'center'
    },
})
export default SignUpScreen;