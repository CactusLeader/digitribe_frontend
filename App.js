import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import AccountCreationScreen from "./components/AccountCreationScreen";
import FocusScreen from "./components/FocusScreen";
import ProfileCreationScreen from "./components/ProfileCreationScreen";
import MapScreen from "./components/MapScreen";
import ChatScreen from "./components/ChatScreen";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import firstName from "./reducers/firstName";
import token from "./reducers/token";

const store = createStore(combineReducers({ firstName, token }));

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
