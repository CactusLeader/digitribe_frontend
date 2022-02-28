import React, { useEffect, useState } from "react";
import { Text, View, ImageBackground } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

function MapScreen() {

    useEffect(() => {
        async function askPermissions() {
          var permissions = await Permissions.askAsync(Permissions.LOCATION);
          console.log('permissions', permissions)
          if (permissions.status === 'granted') {
            var location = await Location.getCurrentPositionAsync({});
            console.log('location',location)
          }
        }
        askPermissions();
      }, []);

  return (
      
<MapView style={{flex : 1}}
    initialRegion={{
    latitude: 37.78825,  // pour centrer la carte
    longitude: -122.4324,
    latitudeDelta: 0.0922,  // le rayon à afficher à partir du centre
    longitudeDelta: 0.0421,
}} />
  );
}

export default MapScreen;
