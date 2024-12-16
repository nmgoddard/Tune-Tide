import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Audio } from "expo-av";

const Playing: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false); 
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const { song } = useLocalSearchParams();
  const parsedSong = song ? JSON.parse(Array.isArray(song) ? song[0] : song) : null;

  useEffect(() => {
    const loadSound = async () => {
      if (parsedSong && parsedSong.preview_url) {
        try {
          const { sound } = await Audio.Sound.createAsync(
            { uri: parsedSong.preview_url },
            { shouldPlay: true }
          );
          setSound(sound);
          setIsPlaying(true);
        } catch (error) {
          console.error('Error loading sound:', error);
        }
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync(); // Cleanup when the component is unmounted
      }
    };
  }, [song]);

  // Toggle play/pause
  const togglePlayPause = async() => {
    if (isPlaying) {
      await sound?.pauseAsync(); // Pause the music
    } else {
      await sound?.playAsync(); // Play the music
    }
    setIsPlaying((prevState) => !prevState);
  };

  if (!song){
    return(
      <View style={styles.container}>
        <Text style={styles.title}>No song data available</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.nowPlaying}>Now Playing</Text>
      <Text style={styles.song}>
        {parsedSong?.name || "Unknown Song"} - {parsedSong?.artists?.[0]?.name || "Unknown Artist"}
      </Text>
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={togglePlayPause}/>
    </View>
  );
};

export default Playing;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: 200,
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    color: "#C3EAF2",
    fontSize: 20,
    marginBottom: 10,
  },
  song: {
    color: "#C3EAF2",
    fontSize: 18,
    marginBottom: 10,
  },
  songDuration: {
    color: "C3EAF2",
    fontSize: 14,
    marginBottom: 20,
  },
  playPauseButton: {
    backgroundColor: "#006EB5", // Secondary color for button
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 10,
  },
  nowPlaying: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  controlButton: {
    backgroundColor: "#519DD5", // Main color for controls
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  detailsButton:{
    backgroundColor: "#006EB5",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
});
