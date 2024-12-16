import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/index'; // Adjust the path if necessary
import Home from './app/home'; // Your Home screen (to be created)
import Search from './app/search'; // Your Home screen (to be created)
import Settings from './app/settings'; // Your Home screen (to be created)
import { RootStackParamList } from './types/navigation';
import NowPlaying from './app/playing';
import Playing from './app/playing';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="search" component={Search}/>
        <Stack.Screen name="settings" component={Settings}/>
        <Stack.Screen name="playing" component={Playing}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
