import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import AccountCreationScreen from "./components/AccountCreationScreen";
import FocusScreen from "./components/FocusScreen";
import ProfileCreationScreen from "./components/ProfileCreationScreen";
import MapScreen from "./components/MapScreen";
import ChatScreen from "./components/ChatScreen";
import CameraScreen from "./components/CameraScreen";
import PeopleScreen from "./components/PeopleScreen";
import PeopleProfileScreen from "./components/PeopleProfileScreen";
import ContactsScreen from "./components/ContactsScreen";

import firstName from "./reducers/firstName";
import token from "./reducers/token";
import account from "./reducers/account";
import poi from "./reducers/poi";
import people from "./reducers/people";

import AppLoading from "expo-app-loading";
import { useFonts } from "@expo-google-fonts/roboto";

import fonts from "./utils/global";

const store = createStore(
  combineReducers({
    firstName,
    token,
    account,
    poi,
    people,
  })
);

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name == "Map") {
            iconName = "ios-navigate";
          } else if (route.name == "People") {
            iconName = "people";
          } else if (route.name === "Contacts") {
            iconName = "chatbox-ellipses";
          }

          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
      barStyle={{
        backgroundColor: "#8525FF",
        shadowOffset: { width: 0, height: 0, elevation: 0 },
        borderTopWidth: 0,
        shadowOpacity: 0,
      }}
      shifting={true}
    >
      <Tab.Screen
        options={{
          tabBarColor: "#8525FF",
        }}
        name="Map"
        component={MapScreen}
      />
      <Tab.Screen
        options={{
          tabBarColor: "#FFD440",
          style: {
            shadowOffset: { width: 0, height: 0, elevation: 0 },
            borderTopWidth: 0,
            shadowOpacity: 0,
          },
        }}
        name="People"
        component={PeopleScreen}
      />
      <Tab.Screen
        options={{ tabBarColor: "#FB33FF" }}
        name="Contacts"
        component={ContactsScreen}
      />
      {/* <Tab.Screen
        options={{ tabBarColor: "#1932FF" }}
        name="City"
        component={CityScreen}
      /> */}
    </Tab.Navigator>
  );
};

export default function App() {
  let [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
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
            <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen
              name="PeopleProfile"
              component={PeopleProfileScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
