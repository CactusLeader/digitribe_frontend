import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import AccountCreationScreen from "./components/AccountCreationScreen";
import FocusScreen from "./components/FocusScreen";
import ProfileCreationScreen from "./components/ProfileCreationScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="AccountCreation"
          component={AccountCreationScreen}
        />
        <Stack.Screen name="Focus" component={FocusScreen} />
        <Stack.Screen
          name="ProfileCreation"
          component={ProfileCreationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
