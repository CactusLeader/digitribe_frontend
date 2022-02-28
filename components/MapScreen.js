import React, { useEffect, useState } from "react";
import { Text, View, ImageBackground } from "react-native";
import MapView from "react-native-maps";
import {Marker} from 'react-native-maps';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

function MapScreen() {

    const [currentLatitude, setCurrentLatitude] = useState(48.866667);
    const [currentLongitude, setCurrentLongitude] = useState(2.333333);

    console.log('currentLattitude', currentLatitude)
    console.log('currentLongitude', currentLongitude)

    useEffect(() => {
        async function askPermissions() {
          var permissions = await Permissions.askAsync(Permissions.LOCATION);
          console.log('permissions', permissions)
          if (permissions.status === 'granted') {
            await Location.watchPositionAsync(
                {distanceInterval :10},
                (location) => {
                    console.log('location',location)
                    setCurrentLatitude(location.coords.latitude)
                    setCurrentLongitude(location.coords.longitude)
                });
          }
        }
        askPermissions();
      }, []);

  return (
      
<MapView style={{flex : 1}}>
<Marker
          coordinate={{
            latitude: currentLatitude,
            longitude: currentLongitude,
          }}
          title="Hello"
          description="I am here"
        />

</MapView>
    
  );
}

export default MapScreen;
