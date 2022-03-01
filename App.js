import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import AccountCreationScreen from "./components/AccountCreationScreen";
import FocusScreen from "./components/FocusScreen";
import ProfileCreationScreen from "./components/ProfileCreationScreen";
import MapScreen from "./components/MapScreen";
import ChatScreen from "./components/ChatScreen";
import CameraScreen from "./components/CameraScreen";

import firstName from "./reducers/firstName";
import token from "./reducers/token";
import account from "./reducers/account";

const store = createStore(combineReducers({ firstName, token, account }));

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
          <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
