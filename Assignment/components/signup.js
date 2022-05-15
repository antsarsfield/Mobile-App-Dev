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
                <Text style={styles.formLabel}>Sign Up</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder="First Name"
                    onChangeText={(firstname) => this.setState({ firstname })}
                    value={this.state.firstname}
                /><TextInput
                    style={styles.formInput}
                    placeholder="Last Name"
                    onChangeText={(lastname) => this.setState({ lastname })}
                    value={this.state.lastname}
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