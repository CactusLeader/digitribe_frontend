import React, { useEffect, useState } from "react";
import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { Button, Overlay, Input } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";

import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

function MapScreen() {
  const [currentLatitude, setCurrentLatitude] = useState(48.866667);
  const [currentLongitude, setCurrentLongitude] = useState(2.333333);
  const [addPOI, setAddPOI] = useState(false);
  const [listPOI, setListPOI] = useState([]);

  console.log("currentLattitude", currentLatitude);
  console.log("currentLongitude", currentLongitude);
  console.log("addPOI", addPOI);
  console.log("listPOI", listPOI);

  useEffect(() => {
    async function askPermissions() {
      var permissions = await Permissions.askAsync(Permissions.LOCATION);
      console.log("permissions", permissions);
      if (permissions.status === "granted") {
        await Location.watchPositionAsync(
          { distanceInterval: 10 },
          (location) => {
            console.log("location", location);
            setCurrentLatitude(location.coords.latitude);
            setCurrentLongitude(location.coords.longitude);
          }
        );
      }
    }
    askPermissions();
  }, []);

  onPressButton = () => {
    setAddPOI(true);
  };

  onPressScreen = (evt) => {
    console.log("evt.nativeEvent", evt.nativeEvent);
    const lat = evt.nativeEvent.coordinate.latitude;
    const long = evt.nativeEvent.coordinate.longitude;
    console.log("lat", lat);
    console.log("long", long);
    if (addPOI) {
      setListPOI([...listPOI, { lat, long }]);
    }
  };

  const tabListPOI = listPOI.map((poi, index) => {
    return (
      <Marker
        key={index}
        coordinate={{
          latitude: poi.lat,
          longitude: poi.long,
        }}
        pinColor="#FFD440"
      />
    );
  });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MapView
        onPress={(evt) => onPressScreen(evt)}
        style={{
          flex: 1,
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Marker
          coordinate={{
            latitude: currentLatitude,
            longitude: currentLongitude,
          }}
          title="Hello"
          description="I am here"
          pinColor="#8525FF"
        />
        {tabListPOI}
      </MapView>
      <View
        style={{
          position: "absolute",
          bottom: 15,
          right: 15,
        }}
      >
        <Button
          icon={{
            name: "plus",
            type: "entypo",
            size: 35,
            color: "white",
          }}
          buttonStyle={{
            backgroundColor: "#FFD440",
            borderRadius: 100,
            borderColor: "white",
            borderWidth: 2,
            width: 65,
            height: 65,
          }}
          containerStyle={{
            marginHorizontal: 30,
            marginVertical: 30,
          }}
          onPress={() => onPressButton()}
        />
      </View>
    </View>
  );
}

export default MapScreen;
