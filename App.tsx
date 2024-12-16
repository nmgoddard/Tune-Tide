// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/index';   // Adjust the path if necessary
import Home from './app/home';     // Home screen
import Search from './app/search'; // Search screen
import Settings from './app/settings'; // Settings screen

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
