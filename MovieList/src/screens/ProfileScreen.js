import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable } from 'react-native'; 
import { auth } from '../config/firebase';
import { updateProfile } from 'firebase/auth';

const ProfileScreen = () => {
    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        if (auth.currentUser) {
            setDisplayName(auth.currentUser.displayName || '');
        }
    }, []);

    const handleUpdateProfile = async () => {
        try {
            await updateProfile(auth.currentUser, { displayName });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Display Name:</Text>
            <TextInput
                style={styles.input}
                value={displayName}
                onChangeText={setDisplayName}
            />
            <Pressable style={styles.button} onPress={handleUpdateProfile}>
                <Text style={styles.buttonText}>Update Profile</Text>
            </Pressable>
            <Text style={styles.displayText}>Hello, {displayName || 'Guest'}</Text>
            <Text style={styles.moreComingSoon}>More coming soon!</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,  
    },
    label: {
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        width: '90%',  
    },
    displayText: {
        fontSize: 18,
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    moreComingSoon: {
        marginTop: 20,
        fontSize: 16,
        fontStyle: 'italic',
        color: 'grey',
    }
});

export default ProfileScreen;