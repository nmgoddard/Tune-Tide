import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Audio } from "expo-av";

const Playing: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Track play/pause state
  const [songTitle, setSongTitle] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");
  const [songDuration, setSongDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const { song } = useLocalSearchParams();
  const parsedSong = song ? JSON.parse(Array.isArray(song) ? song[0] : song) : null;

  useEffect(() => {
    if (song){
      const parsedSong = JSON.parse(decodeURIComponent(song as string));
      setSongTitle(parsedSong.name);
      setArtistName(parsedSong.artists[0].name);
      setSongDuration(parsedSong.duration_ms / 1000);
      loadAudio(parsedSong.preview_url);
    }

    return () => {
      if (sound){
        sound.unloadAsync();
      }
    };
  }, [song]);

  const loadAudio = async (url: string) => {
    const { sound } = await Audio.Sound.createAsync(
      {uri: url},
      { shouldPlay: isPlaying },
      onPlaybackStatusUpdate
    );
    setSound(sound);
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis / 1000); // Update the current playback time in seconds
    }
  };

  // Toggle play/pause
  const handlePlayPause = async() => {
    if (isPlaying) {
      await sound?.pauseAsync(); // Pause the music
    } else {
      await sound?.playAsync(); // Play the music
    }
    setIsPlaying((prevState) => !prevState);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  // Skip to next song (you would have to connect this to your song source)
  const handleSkip = () => {
    console.log("Skipping to the next song...");
    // Logic to play the next song can go here.
  };

  // Rewind to previous song (similar to skip, connect this to your song source)
  const handleRewind = () => {
    console.log("Rewinding to the previous song...");
    // Logic to rewind to the previous song can go here.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.nowPlaying}>Now Playing</Text>
      <Text style={styles.song}>
        {parsedSong?.name || "Unknown Song"} - {parsedSong?.artists?.[0]?.name || "Unknown Artist"}
      </Text>

      <TouchableOpacity onPress={handlePlayPause} style={styles.playPauseButton}>
        <Text style={styles.buttonText}>{isPlaying ? "Pause" : "Play"}</Text>
      </TouchableOpacity>
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
