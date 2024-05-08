import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Pressable, StyleSheet, ScrollView, Keyboard, FlatList, Image } from 'react-native'; // ScrollView
import { postReview, fetchReviews } from '../utils/api';

const ReviewScreen = () => { // route
    const [title, setTitle] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState('');
    // const { movieId } = route.params; 
    const [reviews, setReviews] = useState([]);

    const handlePostReview = async () => {
        try {
            Keyboard.dismiss();
            await postReview({ title, text: reviewText, rating });
            alert('Review posted successfully!');
            setTitle('');
            setReviewText('');
            setRating('');
            const updatedReviews = await fetchReviews(); //
            setReviews(updatedReviews); //
        } catch (error) {
            console.error('Error posting review:', error);
            alert('Failed to post review.');
        }
    };

    useEffect(() => {
        const getReviews = async () => {
            const fetchedReviews = await fetchReviews();
            setReviews(fetchedReviews);
        };
        getReviews();
    }, []);

    // if (!movieId) {
    //     return <View style={styles.container}><Text>No movie selected for review.</Text></View>;
    // }

    /* It works but gives console error about VirutalizedLists should never be nested inside plain ScrollViews
    with the same oreintation because it can break windowing and other functionality*/
    // return (
    //     <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
    //         <Text style={styles.header}>Create Review</Text>
    //         <TextInput
    //             style={styles.input}
    //             value={title}
    //             onChangeText={setTitle}
    //             placeholder="Title of your review"
    //         />
    //         <TextInput
    //             style={styles.input}
    //             value={reviewText}
    //             onChangeText={setReviewText}
    //             placeholder="Write your review here..."
    //             multiline
    //         />
    //         <TextInput
    //             style={styles.input}
    //             value={rating}
    //             onChangeText={setRating}
    //             placeholder="Rating from 1 to 5"
    //             keyboardType="numeric"
    //         />
    //         <Pressable style={styles.button} onPress={handlePostReview}>
    //             <Text style={styles.buttonText}>Post Review</Text>
    //         </Pressable>

    //         {/* <FlatList
    //             data={reviews}
    //             keyExtractor={item => item.id}
    //             renderItem={({ item }) => (
    //                 <View style={styles.reviewItem}>
    //                     <Text style={styles.title}>{item.title}</Text>
    //                     <Text>{item.reviewText}</Text>
    //                     <Text>Rating: {item.rating}</Text>
    //                 </View>
    //             )}
    //         /> */}
    //         <Text style={styles.header}>My Reviews</Text>
    //         <FlatList
    //             data={reviews}
    //             keyExtractor={item => item.id}
    //             renderItem={({ item }) => (
    //                 <View style={styles.reviewItem}>
    //                     <Image source={{ uri: 'https://via.placeholder.com/100x150' }} style={styles.image} />
    //                     <View style={styles.reviewTextContainer}>
    //                         <Text style={styles.title}>{item.title}</Text>
    //                         <Text>{item.reviewText}</Text>
    //                         <Text>Rating: {item.rating}</Text>
    //                     </View>
    //                 </View>
    //             )}
    //         />
    //     </ScrollView>
    // );

    return (
        <View style={styles.container}>
            <ScrollView style={styles.formContainer}>
                <Text style={styles.header}>Create Review</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Title of your review"
                />
                <TextInput
                    style={styles.input}
                    value={reviewText}
                    onChangeText={setReviewText}
                    placeholder="Write your review here..."
                    multiline
                />
                <TextInput
                    style={styles.input}
                    value={rating}
                    onChangeText={setRating}
                    placeholder="Rating from 1 to 5"
                    keyboardType="numeric"
                />
                <Pressable style={styles.button} onPress={handlePostReview}>
                    <Text style={styles.buttonText}>Post Review</Text>
                </Pressable>
            </ScrollView>
            <Text style={styles.header}>My Reviews</Text>
            <FlatList
                data={reviews}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.reviewItem}>
                        <Image source={{ uri: 'https://via.placeholder.com/100x150' }} style={styles.image} />
                        <View style={styles.reviewTextContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text>{item.reviewText}</Text>
                            <Text>Rating: {item.rating}</Text>
                        </View>
                    </View>
                )}
                style={styles.reviewsList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20, // 10
        marginBottom: 10, // 5
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        // marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    reviewItem: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    image: {
        width: 100,
        height: 150,
        marginRight: 10,
    },
    reviewTextContainer: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
    },
    formContainer: { //
        padding: 20,
    },
    reviewsList: { //
        flex: 1,
    }
});

export default ReviewScreen;