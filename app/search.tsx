import React, { useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, FlatList } from "react-native";
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Link } from "expo-router";
import axios from 'axios';
import NowPlaying from "./playing";
import SpotifyWebApi from "spotify-web-api-node";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const CLIENT_ID = '4b86d9bdd9504812bb81fda5bf228f0a';
const CLIENT_SECRET = '9dc22177fd8749b3abb930e4d5b96ba4';
const REDIRECT_URI = makeRedirectUri({scheme: "myapp", path: "/search" });


const Search: React.FC = () => {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
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

  const [isAuthInProgress, setIsAuthInProgress] = useState(false);

  const spotifyApi = new SpotifyWebApi();
  
  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
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
        .then((response) => {
          setAccessToken(response.data.access_token);
          setIsAuthInProgress(false);
        })
        .catch((error) => {
          console.error("Error exchanging code for token:", error);
          setIsAuthInProgress(false);
        });
    }
  }, [response]);

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
    }
  }, [accessToken]);

  const searchGo = async() => {
    if (!search.trim()) return;
  
    if (!accessToken) {
      // If no access token, prompt for authentication
      if (!isAuthInProgress){
        setIsAuthInProgress(true);
        await promptAsync();
      }
    } else {
      // Proceed with the search if the user is already authenticated
      spotifyApi.setAccessToken(accessToken);
      spotifyApi
        .searchTracks(search)
        .then((data) => {
          const searchResults = data.body?.tracks?.items || [];
          setResults(searchResults);
        })
        .catch((err) => {
          console.error("Error fetching search results:", err);
        });
    }
  };
  
  
  

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.songItem}>
      <Text style={styles.songTitle}>{item.name}</Text>
      <Text style={styles.songArtist}>{item.artists[0].name}</Text>
      <Link href={`/playing?song=${encodeURIComponent(JSON.stringify(item))}`}>
        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Search for Music</Text>
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          placeholder="Search for songs, albums, or artists"
          placeholderTextColor="#fff"
        />
        <TouchableOpacity style={styles.navButton} onPress={searchGo}>
          <Text style={styles.buttonText}>Go!</Text>
        </TouchableOpacity>

        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.resultsContainer}
          nestedScrollEnabled = {true}
        />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#519DD5", // Main color
    paddingTop: 50,
    paddingBottom: 120,
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
  header: {

  },
  input: {
    width: "75%",
    height: 50,
    backgroundColor: "#89C3E3", // Secondary color
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 5,
    color: "#fff",
  },
  buttonText: {
    color: "#C3EAF2", // Icon color for text
    fontSize: 18,
  },
  navButton: {
    backgroundColor: "#006EB5", // Secondary color for nav buttons
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  songItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  songTitle: {
    fontSize: 18,
    color: "#fff",
  },
  songArtist: {
    fontSize: 14,
    color: "#C3EAF2",
  },
  resultsContainer: {
    width: "100%",
    marginTop: 20,
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
  playButton: {
    backgroundColor: "#006EB5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default Search;