import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation"; 
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Type for navigation
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'login'>;

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigation = useNavigation<LoginScreenNavigationProp>(); 

  const handleLogin = () => {
    if (username === "user" && password === "password") {
      Alert.alert("Login Successful", "You have successfully logged in!");
      navigation.navigate("home");
    } else {
      Alert.alert("Login Failed", "Please check your credentials.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/TuneTide.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to TuneTide</Text>
      <TextInput
        style={styles.input}
        placeholder="Username or email"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#519DD5", 
    padding: 20,
  },
  logo: {
    width: 100, 
    height: 100, 
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    color: "#C3EAF2", 
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#006EB5", 
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 5,
    color: "#fff",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#006EB5", 
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#C3EAF2", 
    fontSize: 18,
  },
});
