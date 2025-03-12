import React, { useEffect, useState } from "react";  // Import React and necessary hooks
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  StyleSheet
} from "react-native";  // Import necessary React Native components
import { Link } from "expo-router";  // Import Link component for navigation
import busStops from "../assets/bus_stops.json";  // Import bus stop data from a local JSON file

// Interface to define the structure of a BusStop object
interface BusStop {
  stop_id: string;
  stop_name: string;
  zone_id?: string;
  latitude?: number;
  longitude?: number;
  routes?: string;
  stop_url?: string;
}

const BusStopList: React.FC = () => {
  // State hooks to manage bus stop data and loading state
  const [data, setData] = useState<BusStop[]>([]);  // Holds the bus stop data
  const [loading, setLoading] = useState(true);  // Indicates whether data is still loading

  // useEffect hook to simulate fetching data and update state when component mounts
  useEffect(() => {
    const fetchData = () => {
      // Transforming the raw JSON data into a structured BusStop array
      const parsedData: BusStop[] = busStops.map((stop: any) => ({
        stop_id: stop.stop_id,
        stop_name: stop.stop_name,
        zone_id: stop.zone_id || "N/A",  // Default "N/A" if no zone_id is provided
        latitude: stop.latitude ? Number(stop.latitude) : 0,  // Convert latitude to number, default to 0 if missing
        longitude: stop.longitude ? Number(stop.longitude) : 0,  // Convert longitude to number, default to 0 if missing
        routes: stop.routes || "N/A",  // Default to "N/A" if routes are not provided
        stop_url: stop.stop_url || "",  // Default to empty string if no URL
      }));

      setData(parsedData);  // Update state with parsed data
      setLoading(false);  // Set loading state to false after data is fetched
    };

    // Simulate network delay by using a timeout (could be replaced with actual data fetch)
    setTimeout(fetchData, 1000);
  }, []);  // Empty dependency array means this effect runs only once when the component mounts

  // Function to render each bus stop item in the list
  const renderBusStop = ({ item }: { item: BusStop }) => (
    <View style={styles.itemContainer}>
      {/* Link to a detail page with parameters passed as URL params */}
      <Link
        href={{
          pathname: "/details",  // Navigate to the /details page
          params: {
            stop_id: item.stop_id,
            stop_name: item.stop_name,
            zone_id: item.zone_id ?? "N/A",  // Fallback to "N/A" if zone_id is missing
            latitude: item.latitude?.toString() ?? "0",  // Convert latitude to string
            longitude: item.longitude?.toString() ?? "0",  // Convert longitude to string
            routes: item.routes ?? "N/A",  // Fallback to "N/A" if routes are missing
            stop_url: item.stop_url ?? "",  // Fallback to empty string if stop_url is missing
          },
        }}
        accessibilityLabel={`Bus stop: ${item.stop_name}. Double-tap to view details.`}  // Screen reader label
      >
        <Text style={styles.stopName}>{item.stop_name}</Text>
      </Link>
      <Text>Stop ID: {item.stop_id}</Text>

      {/* Display stop url as a clickable link */}
      {item.stop_url && (
        <TouchableOpacity
          onPress={() => Linking.openURL(item.stop_url!)}  // Open the URL in an external browser
          accessible  // Ensures accessibility features are enabled for the button
          accessibilityLabel="Bus stop URL. Double-tap to open in external browser."  // Screen reader label
        >
          <Text style={styles.link}>{item.stop_url}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // Main return function, renders the bus stops in a list
  return (
    <View style={styles.container}>
      <FlatList
        data={data}  // Data passed to FlatList for rendering
        keyExtractor={(item) => item.stop_id}  // Unique key for each list item
        renderItem={renderBusStop}  // Function to render each item
      />
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  stopName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "blue",
    marginTop: 5,
  },
});

export default BusStopList;// Export the BusStopList component to be used in other parts of the app
