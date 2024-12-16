import React, { useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Link } from "expo-router";
import axios from 'axios';
import NowPlaying from "./playing";
import SpotifyWebApi from "spotify-web-api-node";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const PORT = 8081; // Corrected: PORT should not be part of the config object
const CLIENT_ID = '4b86d9bdd9504812bb81fda5bf228f0a';
const CLIENT_SECRET = '9dc22177fd8749b3abb930e4d5b96ba4';
const REDIRECT_URI = makeRedirectUri({scheme: "your-app-scheme", path: "/search" });


const Search: React.FC = () => {

  const [search, setSearch] = useState("");
  const [song, setSong] = useState(null);
  const spotifyApi = new SpotifyWebApi();
  let any : any[] = [];
  const [results, setResults] = useState(any)
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      scopes: ['user-read-email', 'playlist-modify-public'],
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );
  
  const [accessToken, setAccessToken] = React.useState("mockAccessToken");
  const [refreshToken, setRefreshToken] = React.useState("mockRefreshToken");

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      // Exchange code for access token and refresh token
      axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          'grant_type': 'authorization_code',
          'redirect_uri': REDIRECT_URI,
          'code': code
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          auth: {
            username: CLIENT_ID,
            password: CLIENT_SECRET
          }
        }
      )
        .then((response) => {
          setAccessToken(response.data.access_token);
          setRefreshToken(response.data.refresh_token);
        })
        .catch((error) => {
          console.error('Error exchanging code for token:', error);
        });
    }
  }, [response]);

  const searchGo = () =>{
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.searchTracks(search)
  .then(function(data) {
    let searchResults = data.body.tracks
    let searchItems = searchResults?.items
    setResults(searchItems!)
    console.log(results)
  }, function(err) {
    console.error(err);
  });
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Search for Music</Text>

        <Text style={styles.description}>
          Search your favorite songs, artists, or albums here.
        </Text>
        <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />
      <TouchableOpacity style={styles.navButton} onPressIn={() => {promptAsync();}} onPress={searchGo}>
        <Text style={styles.buttonText}>Go!</Text>
      </TouchableOpacity>
      <NowPlaying/>

        {/* Fixed navigation buttons at the bottom */}
        <View style={styles.fixedButtons}>
          <Link href="/home" style={styles.navButton}>
              <Text style={styles.buttonText}>Home</Text>
          </Link>
          <Link href="/search" style={styles.navButton}>
            <Text style={styles.buttonText}>Search</Text>
          </Link>
          <Link href="/settings" style={styles.navButton}>
              <Text style={styles.buttonText}>Settings</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#519DD5", // Main color
    paddingTop: 50,
    paddingBottom: 120, // To avoid the buttons overlapping
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 120, // Ensures the buttons stay at the bottom
  },
  title: {
    fontSize: 30,
    color: "#C3EAF2", // Icon color for the title
    marginBottom: 30,
  },
  description: {
    fontSize: 18,
    color: "#C3EAF2", // Icon color for text
    textAlign: "center",
    marginBottom: 50,
  },
  fixedButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#519DD5", // Main color for the footer
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  navButton: {
    backgroundColor: "#006EB5", // Secondary color for nav buttons
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#C3EAF2", // Icon color for text
    fontSize: 18,
  },
  input: {
    width: "75%",
    height: 50,
    backgroundColor: "#89C3E3", // Secondary color
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 5,
    color: "#fff",
  }
});
