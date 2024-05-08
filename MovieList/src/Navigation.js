import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import MovieListScreen from './screens/MovieListScreen'; 
import MovieDetailScreen from './screens/MovieDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import ProfileScreen from './screens/ProfileScreen'; 
import ReviewScreen from './screens/ReviewScreen'; 
import SearchScreen from './screens/SearchScreen'; 
import Icon from 'react-native-vector-icons/MaterialIcons';

// Removed Drawer as it caused a main not registered error and reanimated causes some problems...
// "@react-navigation/drawer": "^6.6.15",
// "react-native-reanimated": "^3.11.0",

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator(); 
const Tab = createBottomTabNavigator(); 

/* Initially used Stack Navigator, but changed to Drawer and BottomTab Navigator */
// function AppNavigation() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator initialRouteName="Signup">
//                 <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up' }} />
//                 <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Log In' }} />
//                 <Stack.Screen name="MovieList" component={MovieListScreen} options={{ title: 'Movie List' }} />
//                 <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: 'Movie Details' }} />
//                 <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites' }} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }

function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Signup">
            <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up' }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Log In' }} />
        </Stack.Navigator>
    );
}

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MovieList" component={MovieListScreen} options={{ title: 'Movie List' }} />
            <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: 'Movie Details' }} />
        </Stack.Navigator>
    );
}

function FavoritesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites' }} />
            <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: 'Movie Details' }} />
        </Stack.Navigator>
    );
}

function SearchStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
            <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: 'Movie Details' }} />
        </Stack.Navigator>
    );
}

function ReviewStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Reviews" component={ReviewScreen} options={{ title: 'Reviews' }} />
            <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: 'Movie Details' }} />
        </Stack.Navigator>
    );
}

function MainApp() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeStack} options={{ tabBarIcon: ({ color, size }) => (<Icon name="home" color={color} size={size} />) }} />
            <Tab.Screen name="Favorites" component={FavoritesStack} options={{ tabBarIcon: ({ color, size }) => (<Icon name="favorite" color={color} size={size} />) }} />
            <Tab.Screen name="Search" component={SearchStack} options={{ tabBarIcon: ({ color, size }) => (<Icon name="search" color={color} size={size} />) }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="person" color={color} size={size} />) }} />
            <Tab.Screen name="Reviews" component={ReviewStack} options={{ tabBarIcon: ({ color, size }) => (<Icon name="rate-review" color={color} size={size} />) }} />
        </Tab.Navigator>
    );
}

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Auth" component={AuthStack} />
                <Stack.Screen name="MainApp" component={MainApp} options={{ gestureEnabled: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// function DrawerNavigator() {
//     return (
//         <Drawer.Navigator initialRouteName="HomeTabs">
//             <Drawer.Screen name="HomeTabs" component={HomeTabs} options={{ title: 'Home' }} />
//             <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
//             <Drawer.Screen name="Reviews" component={ReviewScreen} options={{ title: 'Reviews' }} />
//         </Drawer.Navigator>
//     );
// }

export default AppNavigation;
