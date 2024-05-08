import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Pressable, Image } from 'react-native';
import { fetchMoviesBySearch } from '../utils/api';

const SearchScreen = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const handleSearch = async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const movies = await fetchMoviesBySearch(query);
          setResults(movies);
        } catch (error) {
          console.error("Failed to fetch movies:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          handleSearch();
        }, 500); 
    
        return () => clearTimeout(timeoutId);
      }, [query]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search movies..."
                value={query}
                onChangeText={setQuery}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
            />
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        // <Pressable style={styles.resultItem} onPress={() => console.log("Navigate to details", item.id)}>
                        //     <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
                        //     <Text style={styles.title}>{item.title}</Text>
                        // </Pressable>
                        <Pressable 
                            style={styles.resultItem} 
                            onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
                        >
                            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
                            <Text style={styles.title}>{item.title}</Text>
                        </Pressable>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10, 
        paddingHorizontal: 20,
    },
    input: {
        fontSize: 18,
        // padding: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        marginTop: 10, 
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 10,
    },
    image: {
        width: 70,
        height: 100,
        marginRight: 10,
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
        flex: 1,
    }
});

export default SearchScreen;

