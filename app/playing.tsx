import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const NowPlaying: React.FC = () => {
  const handleSongDetails = () => {
    console.log("Displaying song details...");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Now Playing</Text>
      <Text style={styles.song}>Song Title - Artist</Text>
      <Button title="View Details" onPress={handleSongDetails} />
    </View>
  );
};

export default NowPlaying;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    maxHeight:200
  },
  text: {
    color: "white",
    fontSize: 25,
    marginBottom: 20,
  },
  song: {
    color: "white",
    fontSize: 20,
    marginBottom: 15,
  },
});
