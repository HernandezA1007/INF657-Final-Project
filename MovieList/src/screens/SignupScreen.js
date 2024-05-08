import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'; // button
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'; //
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigation.navigate('MainApp');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.logoPartOne}>A</Text>
                <Text style={styles.logoPartTwo}>Movies</Text>
                <Icon name="movie-roll" size={30} color="#007bff" style={styles.icon} />
            </View>
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
            <Pressable style={styles.button} onPress={handleSignUp}>
                <Text>Sign Up</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text>Already have an account? Log in</Text>
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
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    logoPartOne: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#007bff'
    },
    logoPartTwo: {
        fontSize: 24,
        marginLeft: 5,
        color: 'black'
    },
    icon: {
        marginLeft: 10
    },
});

export default SignupScreen;