import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, NativeAppEventEmitter, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/home';
import AboutScreen from './components/about';

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator initialRouteName='
          Home'>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
          </Stack.Navigator>
          <Text>start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;