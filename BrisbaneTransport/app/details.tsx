import React from "react";  // Import React
import { useLocalSearchParams } from "expo-router";  // Import the hook to get the search params passed from the previous screen
import { View, Text, StyleSheet } from "react-native";  // Import necessary React Native components

const BusStopDetails: React.FC = () => {
  // Get the search parameters passed through navigation
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
       {/* Display each item, or fallback if not available */}
      <Text style={styles.title}>{params.stop_name ?? "Unknown Stop"}</Text>
      <Text style={styles.text}>Stop ID: {params.stop_id ?? "N/A"}</Text>
      <Text style={styles.text}>Zone: {params.zone_id ?? "N/A"}</Text>
      <Text style={styles.text}>Latitude: {params.latitude ?? "N/A"}</Text>
      <Text style={styles.text}>Longitude: {params.longitude ?? "N/A"}</Text>
      <Text style={styles.text}>Routes: {params.routes ?? "No routes available"}</Text>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    marginBottom: 5,
  },
});

export default BusStopDetails;  // Export the BusStopDetails component to be used in other parts of the app
