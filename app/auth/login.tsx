import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAuthRequest } from "expo-auth-session";
import { makeRedirectUri } from "expo-auth-session";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'login'>;

const CLIENT_ID = "your-client-id";
const CLIENT_SECRET = "your-client-secret";
const REDIRECT_URI = makeRedirectUri({ scheme: "app-scheme", path: "/home" });

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const Login: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ["user-read-email", "playlist-modify-public"],
      redirectUri: REDIRECT_URI,
    },
    discovery
  );

  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      // Exchange the authorization code for access and refresh tokens
      axios
        .post(
          "https://accounts.spotify.com/api/token",
          new URLSearchParams({
            grant_type: "authorization_code",
            redirect_uri: REDIRECT_URI,
            code: code,
          }).toString(),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            auth: {
              username: CLIENT_ID,
              password: CLIENT_SECRET,
            },
          }
        )
        .then((res) => {
          setAccessToken(res.data.access_token);
          setRefreshToken(res.data.refresh_token);
        })
        .catch((error) => console.error("Error exchanging code for token:", error));
    }
  }, [response]);

  useEffect(() => {
    if (accessToken) {
      // Handle successful login (e.g., store the token and redirect)
      console.log("Access token:", accessToken);
      // Navigate to the home screen after login
      navigation.navigate("home");
    }
  }, [accessToken, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to TuneTide</Text>
      <Button title="Login with Spotify" onPress={() => promptAsync()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
});

export default Login;
