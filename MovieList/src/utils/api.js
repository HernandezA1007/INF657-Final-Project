import { db } from '../config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { auth } from '../config/firebase';

const API_KEY = '4acb8e35c027d5260294838a1525756f';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const json = await response.json();
        return json.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,similar`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
};

export const fetchCategoryMovies = async (category) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`);
        const json = await response.json();
        return json.results;
    } catch (error) {
        console.error(`Error fetching ${category} movies:`, error);
    }
};

export const fetchMoviesBySearch = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
        const json = await response.json();
        return json.results;
    } catch (error) {
        console.error('Error searching movies:', error);
    }
};

export const postReview = async ({ title, text, rating }) => { // movieId
    const reviewCollection = collection(db, 'reviews');
    await addDoc(reviewCollection, {
        // movieId, 
        title,
        reviewText: text,
        rating,
        userId: auth.currentUser.uid, 
        // timestamp: new Date(), 
    });
};

export const fetchReviews = async () => {
    const reviewCollection = collection(db, 'reviews');
    const snapshot = await getDocs(reviewCollection);
    const reviewsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return reviewsList;
};