import { Stack } from "expo-router";  // Import the Stack component from expo-router for handling navigation
import React from "react";  // Import React

const RootLayout: React.FC = () => (
  <Stack>  {/* The Stack component defines the navigation stack for the app */}
    {/* Screen for the home page (index) */}
    <Stack.Screen
      name="index"  // The name of the screen (the homepage of the app)
      options={{ title: "Bus Stops" }}  // Set the title of the screen displayed in the navigation bar
    />

    {/* Screen for the details page */}
    <Stack.Screen
      name="details"  // The name of the screen for the bus stop details page
      options={{ title: "Bus Stop Details" }}  // Set the title of the screen in the navigation bar
    />
  </Stack>
);

export default RootLayout;  // Export the RootLayout component to be used in other parts of the app
