import React, { useState } from 'react'; // useEffect
import { View, Text, Image, ScrollView, StyleSheet, Pressable, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchMovieDetails } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MovieDetailScreen = ({ route, navigation }) => {
    const { movieId } = route.params;
    const [movie, setMovie] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    /* Something about icon persistence state not saving.. trying useFocusEffect instead
    useEffect(() => { 
        const loadMovieDetails = async () => {
            const details = await fetchMovieDetails(movieId);
            setMovie(details);
            if (details) { // 
                checkFavorite();
            }
        };

        loadMovieDetails();
    }, [movieId]);
    */
    useFocusEffect(
        React.useCallback(() => {
            const loadMovieDetails = async () => {
                try {
                    const details = await fetchMovieDetails(movieId);
                    if (details) {
                        setMovie(details);
                        checkFavorite(details); 
                    }
                } catch (error) {
                    console.error('Failed to load movie details:', error);
                }
            };
    
            loadMovieDetails();
        }, [movieId])
    );

    const checkFavorite = async (currentMovie) => {
        try {
            const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
            setIsFavorite(favorites.some(fav => fav.id === currentMovie.id));
        } catch (error) {
            console.error('Failed to check favorites:', error);
        }
    };

    const addToFavorites = async () => {
        if (!movie) return; 
    
        let currentFavorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
        if (currentFavorites.some(fav => fav.id === movie.id)) {
            currentFavorites = currentFavorites.filter(fav => fav.id !== movie.id);
        } else {
            currentFavorites.push(movie);
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(currentFavorites));
        checkFavorite(movie); 
    };

    if (!movie) return <View style={styles.container}><Text>Loading...</Text></View>;

    const renderSimilarMovieItem = ({ item }) => (
        <Pressable onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })} style={styles.similarMovieItem}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.similarImage} />
            <Text style={styles.similarTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
        </Pressable>
    );

    // TODO: Movie information: Cast, Reviews, Trailers, 

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image} />
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.genre}>{movie.genres.map(genre => genre.name).join(', ')}</Text>
            <Text style={styles.overview}>{movie.overview}</Text>
            <Text style={styles.info}>{`Runtime: ${movie.runtime} minutes`}</Text>
            <Text style={styles.info}>{`Rating: ${movie.vote_average}`}</Text>
            <Icon
                name={isFavorite ? 'favorite' : 'favorite-border'}
                size={24}
                color="red"
                onPress={addToFavorites}
                style={{ alignSelf: 'center', marginVertical: 10 }}
            />
            {/* <View style={styles.similarContainer}>
                <Text style={styles.subTitle}>Similar Movies:</Text>
                {movie.similar.results.map(similarMovie => (
                    <Pressable key={similarMovie.id} onPress={() => navigation.navigate('MovieDetail', { movieId: similarMovie.id })}>
                        <Text style={styles.similarTitle}>{similarMovie.title}</Text>
                    </Pressable>
                ))}
            </View> */}
            <View style={styles.similarContainer}>
                <Text style={styles.subTitle}>Similar Movies:</Text>
                <FlatList
                    horizontal
                    data={movie.similar.results}
                    renderItem={renderSimilarMovieItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            {/* , { movieId: movieId} */}
            <Pressable style={styles.reviewButton} onPress={() => navigation.navigate('Reviews')}> 
                <Text style={styles.buttonText}>Write Review</Text>
            </Pressable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10
    },
    genre: {
        fontSize: 16,
        color: 'grey'
    },
    overview: {
        fontSize: 16,
        textAlign: 'justify',
        marginVertical: 10
    },
    info: {
        fontSize: 16
    },
    similarContainer: {
        marginTop: 20
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    similarTitle: {
        fontSize: 14, // 16
        // color: 'blue'
        textAlign: 'center',
        marginTop: 5
    },
    similarMovieItem: {
        width: 120,
        marginRight: 10,
    },
    similarImage: {
        width: '100%',
        height: 180,
        borderRadius: 10,
    },
    reviewButton: {
        marginTop: 10,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    }
});

export default MovieDetailScreen;