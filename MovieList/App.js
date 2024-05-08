// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
// import { auth } from './src/config/firebase';
import AppNavigation from './src/Navigation';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <StatusBar style="auto" /> */}
      {/* <Text>Firebase is {auth ? 'connected' : 'not connected'}!</Text> */}
      <AppNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'stretch', // center
    // justifyContent: 'center',
    // padding: 25,
  },
});
