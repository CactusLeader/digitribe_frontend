import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button, Overlay, Input, Icon, Image } from "react-native-elements";
import { Camera } from "expo-camera";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { BorderlessButton } from "react-native-gesture-handler";

const Stack = createStackNavigator();

function MapScreen(props) {
  const [currentLatitude, setCurrentLatitude] = useState(48.866667);
  const [currentLongitude, setCurrentLongitude] = useState(2.333333);
  const [addPOI, setAddPOI] = useState(false);
  const [listPOI, setListPOI] = useState([]);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [seePhoto, setSeePhoto] = useState(false);
  const [getCoordinate, setGetCoordinate] = useState(false);

  console.log("props.poi", props.poi);

  useEffect(() => {
    async function askPermissions() {
      var permissions = await Permissions.askAsync(Permissions.LOCATION);
      // console.log("permissions", permissions);
      if (permissions.status === "granted") {
        await Location.watchPositionAsync(
          { distanceInterval: 10 },
          (location) => {
            // console.log("location", location);
            setCurrentLatitude(location.coords.latitude);
            setCurrentLongitude(location.coords.longitude);
          }
        );
        if (currentLatitude && currentLongitude) {
          let rawData = await fetch(
            "https://digitribebackend.herokuapp.com/map",
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: `currentLatitude=${currentLatitude}&currentLongitude=${currentLongitude}&token=${props.token}`,
            }
          );
          let data = await rawData.json();
          // console.log("data", data);
          // console.log("data.location", data.location);
        }
      }
    }
    askPermissions();
  }, []);

  const onPressButton = () => {
    setVisible(true);
    setHasPhoto(false);
  };

  const onPressScreen = async (evt) => {
    "#1mapDispatchToProps#onClickAddPoi#onPressScreen";

    const lat = evt.nativeEvent.coordinate.latitude;
    const long = evt.nativeEvent.coordinate.longitude;
    console.log("lat", lat);
    console.log("long", long);

    setGetCoordinate(true);
    if (addPOI) {
      setListPOI([
        ...listPOI,
        { lat, long, title, description, photo: props.photo },
      ]),
        props.onAddPoiOnMap(lat, long);
      setAddPOI(false);

      const poi = props.poi;

      const poiInfo = [];
      poiInfo.push(`photo=${poi[poi.length - 1].photo}`);
      poiInfo.push(`description=${poi[poi.length - 1].desc}`);
      poiInfo.push(`title=${poi[poi.length - 1].title}`);
      poiInfo.push(`latitude=${poi[poi.length - 1].lat}`);
      poiInfo.push(`longitude=${poi[poi.length - 1].lon}`);
      // poiInfo.push(`userId=${}`);
      poiInfo.push(`token=${props.token}`);
      const pInfo = poiInfo.join("&");

      useEffect(() => {
        async function loadData() {
      let rawData = await fetch("http://172.20.10.5:3000/place", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: pInfo,
      });
      let dataFinal = await rawData.json();
      console.log("data", dataFinal);
    }
    loadData()
  }, []);

  const chatSubmit = () => {
    props.navigation.navigate("Chat");
  };

  const contactsSubmit = () => {
    props.navigation.navigate("Contacts");
  };

  const profilesSubmit = () => {
    props.navigation.navigate("People");
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const onPressAddPoi = () => {
    setVisible(!visible);
    setAddPOI(true);
    if (hasPhoto === false) {
      const infoPOI = { title, description };
      props.onAddInfoPOI(infoPOI);
    }
  };

  const InputTitleChange = (val) => {
    setTitle(val);
  };

  const InputDescChange = (val) => {
    setDescription(val);
  };

  const onPressAddPhoto = () => {
    const infoPOI = { title, description };
    props.onAddInfoPOI(infoPOI);
    setVisible(false);
    setAddPOI(true);
    setHasPhoto(true);
    props.navigation.navigate("Camera");
  };

  // const onClickMiniature = () => {
  //   return(
  //   <View
  //     style={{
  //       flex: 1,
  //       alignItems: "stretch",
  //     }}
  //   >
  //     <Image
  //       source={{
  //         uri: poi.photo,
  //       }}
  //       style={{
  //         flex: 1,
  //       }}
  //     />
  //   </View>)
  // };

  const onPressMarker = () => {
    // console.log("#onpressmarker");
    // console.log("seePhoto", seePhoto);
    if (seePhoto) {
      setSeePhoto(false);
    } else {
      setSeePhoto(true);
    }
  };

  let image = null;

  const tabListPOI = props.poi.map((poi, index) => {
    if (seePhoto && hasPhoto) {
      image = (
        <View
          style={{
            height: "25%",
            width: "100%",
            backgroundColor: "#FFD440",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            borderColor: "white",
            borderTopStartRadius: 50,
            borderTopEndRadius: 50,
            borderWidth: 5,
          }}
        >
          <Image
            source={{
              uri: poi.photo,
            }}
            style={{
              width: 200,
              height: 200,
              resizeMode: "contain",
            }}
            // onPress={() => onClickMiniature()}
          />
          {/* <View
            style={{
              alignSelf: "flex-end",
              justifyContent: "flex-start",
              flexBasis:"auto"
            }}
          >
            <Text
              style={{
                fontSize: "16",
                fontWeight: "bold",
              }}
            >
              {poi.title}
            </Text>
            <Text
            style={{
              fontSize: "16",
              fontWeight: "bold",
            }}>{poi.desc}</Text>
          </View> */}
        </View>
      );
    }

    if (getCoordinate) {
      return (
        <View key={index}>
          <Marker
            onPress={() => onPressMarker()}
            coordinate={{
              latitude: poi.lat,
              longitude: poi.lon,
            }}
            pinColor="#FFD440"
            title={poi.title}
            description={poi.desc}
          ></Marker>
        </View>
      );
    }
  });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MapView
        onPress={(evt) => onPressScreen(evt)}
        region={{
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "flex-start",
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
      {image}
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
            marginHorizontal: 15,
            marginVertical: 30,
          }}
          onPress={() => onPressButton()}
        />
        {/* <Button title="Chat" onPress={() => chatSubmit()} /> */}

        <Button title="Contacts" onPress={() => contactsSubmit()} />
        <Button title="Profile" onPress={() => profilesSubmit()} />

        {/* <Button title="getCoord" onPress={() => getCoordSubmit()} /> */}

        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{ width: "70%" }}
        >
          <Input
            placeholder="Title"
            onChangeText={(val) => InputTitleChange(val)}
          />
          <Input
            placeholder="Description"
            onChangeText={(val) => InputDescChange(val)}
          />
          <View style={{ alignItems: "center" }}>
            <Button
              title="ajouter photo"
              titleStyle={{
                color: "black",
                fontSize: 14,
              }}
              buttonStyle={{
                color: "black",
                borderRadius: 100,
                borderColor: "black",
              }}
              icon={{
                name: "photo-camera",
                type: "materialicon",
                size: 20,
                color: "black",
              }}
              onPress={() => onPressAddPhoto()}
              type="outline"
              containerStyle={{
                marginBottom: 20,
                width: 150,
                borderColor: "black",
              }}
            />
          </View>
          <Button
            buttonStyle={{
              color: "#8525FF",
              backgroundColor: "#FFD440",
            }}
            icon={
              <Icon
                name="map-pin"
                type="font-awesome"
                color="white"
                size={25}
                iconStyle={{ marginRight: 10 }}
              />
            }
            title="Ajouter POI"
            onPress={() => onPressAddPoi()}
          />
        </Overlay>
      </View>
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  console.log("#1mapDispatchToProps");
  return {
    onAddPoiOnMap: function (lat, long) {
      // console.log("#1mapDispatchToProps#onClickAddPoi");
      dispatch({
        type: "addCoord",
        lat: lat,
        lon: long,
      });
    },
    onAddInfoPOI: function (val) {
      dispatch({
        type: "addInfo",
        title: val.title,
        desc: val.description,
      });
    },
  };
}

function mapStateToProps(state) {
  // console.log("mapStateToProps");
  return {
    poi: state.poi,
    token: state.token,
    // id: state.people,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
