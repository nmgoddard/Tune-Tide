import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../app/home"; // import your home screen here
import Login from "../app/auth/login"; // import the login screen
import Search from "../app/search";

export type RootStackParamList = {
  home: undefined;
  login: undefined;
  search: undefined;
  settings: undefined;
  playing: { song: any};
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="search" component={Search}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
