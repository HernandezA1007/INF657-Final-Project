import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'; // button 
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('MainApp'); // MovieList
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text>Log In</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Signup')}>
                <Text>Need an account? Sign up</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        width: '100%',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 10,
    }
});

export default LoginScreen;