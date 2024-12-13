import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Link, useNavigation } from "expo-router";

const Home: React.FC = () => {

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to TuneTide</Text>

        <Text style={styles.description}>
          Enjoy the best music streaming experience with your favorite tracks.
        </Text>

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

export default Home;

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
});
