import React, { useEffect, useState} from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

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
    backgroundColor: "#519DD5",
    paddingTop: 50,
    paddingBottom: 120,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 120,
  },
  title: {
    fontSize: 30,
    color: "#C3EAF2",
    marginBottom: 30,
  },
  description: {
    fontSize: 18,
    color: "#C3EAF2",
    textAlign: "center",
    marginBottom: 50,
  },
  fixedButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#519DD5",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  navButton: {
    backgroundColor: "#006EB5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#C3EAF2",
    fontSize: 18,
  },
});
