import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        const favs = await AsyncStorage.getItem('favorites');
        setFavorites(favs ? JSON.parse(favs) : []);
    };

    // const renderFavoriteItem = ({ item }) => (
    //     <Pressable onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}>
    //         <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movieImage} />
    //         <Text style={styles.movieTitle}>{item.title}</Text>
    //     </Pressable>
    // );
    const renderFavoriteItem = ({ item }) => (
        <Pressable onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })} style={styles.movieItem}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movieImage} />
            <Text style={styles.movieTitle}>{item.title}</Text>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                renderItem={renderFavoriteItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    movieItem: {
        flexDirection: 'row', 
        marginBottom: 10,
        alignItems: 'center', 
    },
    movieImage: {
        width: 140, // 120
        height: 210, // 180
        marginRight: 15, // 10
        borderRadius: 10,
    },
    movieTitle: {
        flex: 1,
        fontSize: 18, 
        fontWeight: 'bold',
    }
});

export default FavoritesScreen;