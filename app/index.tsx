import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation"; // Import types
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// This gives you better type safety for navigation
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'login'>;

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigation = useNavigation<LoginScreenNavigationProp>(); // Use typed navigation

  const handleLogin = () => {
    // Simple login validation (replace with real logic later)
    if (username === "user" && password === "password") {
      Alert.alert("Login Successful", "You have successfully logged in!");
      // Navigate to Home after successful login
      navigation.navigate("home");
    } else {
      Alert.alert("Login Failed", "Please check your credentials.");
    }
  };

  return (
    <View style={styles.container}>
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
    backgroundColor: "#519DD5", // Main color
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: "#C3EAF2", // Icon color for the title
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#006EB5", // Secondary color
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 5,
    color: "#fff",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#006EB5", // Secondary color
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#C3EAF2", // Icon color for the text
    fontSize: 18,
  },
});
