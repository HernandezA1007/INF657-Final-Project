import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable, ScrollView } from 'react-native'; // TouchableOpacity
import { fetchCategoryMovies } from '../utils/api'; // fetchMovies

const MovieListScreen = ({ navigation }) => {
    // const [movies, setMovies] = useState([]);
    const [trending, setTrending] = useState([]);
    const [popular, setPopular] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);

    // useEffect(() => {
    //     const loadMovies = async () => {
    //         const fetchedMovies = await fetchMovies();
    //         setMovies(fetchedMovies);
    //     };

    //     loadMovies();
    // }, []);
    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        setTrending(await fetchCategoryMovies('trending/all/day'));
        setPopular(await fetchCategoryMovies('popular'));
        setUpcoming(await fetchCategoryMovies('upcoming'));
        setTopRated(await fetchCategoryMovies('top_rated'));
    };

    const renderMovieItem = ({ item }) => (
        <Pressable onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movieImage} />
            {/* <Text>{item.title}</Text> */}
            <Text style={styles.movieTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
        </Pressable>
    );

    return (
        // <View style={styles.container}>
        //     <FlatList
        //         data={movies}
        //         keyExtractor={(item) => item.id.toString()}
        //         renderItem={({ item }) => (
        //             <Text>{item.title}</Text> 
        //         )}
        //     />
        // </View>
        <ScrollView style={styles.container}>
            <View style={styles.category}>
                <Text style={styles.title}>Trending</Text>
                <FlatList
                    horizontal
                    data={trending}
                    renderItem={renderMovieItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false} //
                />
            </View>
            <View style={styles.category}>
                <Text style={styles.title}>Popular</Text>
                <FlatList
                    horizontal
                    data={popular}
                    renderItem={renderMovieItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false} //
                />
            </View>
            <View style={styles.category}>
                <Text style={styles.title}>Upcoming</Text>
                <FlatList
                    horizontal
                    data={upcoming}
                    renderItem={renderMovieItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false} //
                />
            </View>
            <View style={styles.category}>
                <Text style={styles.title}>Top Rated</Text>
                <FlatList
                    horizontal
                    data={topRated}
                    renderItem={renderMovieItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false} //
                />
            </View>

            {/* <Pressable onPress={() => navigation.navigate('Favorites')} style={styles.favoritesButton}>
                <Text>View Favorites</Text>
            </Pressable> */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: 20,
        // marginTop: 20,
    },
    category: {
        marginBottom: 20,
        paddingHorizontal: 10
    },
    title: {
        fontSize: 20, // 18
        fontWeight: 'bold',
        marginLeft: 10,
    },
    movieImage: {
        width: 120,
        height: 180,
        marginRight: 10,
        borderRadius: 10,
        marginBottom: 5, //
    },
    movieTitle: {
        // position: 'absolute',
        // bottom: 5,
        // left: 5,
        // right: 5,
        // color: 'white',
        // fontSize: 16,
        // fontWeight: 'bold',
        // textAlign: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.7)',
        // padding: 2,
        // borderRadius: 5,
        // overflow: 'hidden', //
        // textOverflow: 'ellipsis', //
        // whiteSpace: 'nowrap', //
        width: 120,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14
    },
    favoritesButton: {
        padding: 10,
        backgroundColor: '#007bff',
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 5
    }
});

export default MovieListScreen;