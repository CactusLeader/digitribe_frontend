import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Overlay, Input, Icon, Image } from "react-native-elements";
import { Camera } from "expo-camera";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

const Stack = createStackNavigator();

function MapScreen(props) {
  const [currentLatitude, setCurrentLatitude] = useState(48.866667);
  const [currentLongitude, setCurrentLongitude] = useState(2.333333);
  const [addPOI, setAddPOI] = useState(false);
  const [listPOI, setListPOI] = useState([]);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hasPermission, setHasPermission] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [seePhoto, setSeePhoto] = useState(false);

  //   console.log("currentLattitude", currentLatitude);
  //   console.log("currentLongitude", currentLongitude);
  //   console.log("addPOI", addPOI);
  // console.log("listPOI", listPOI);
  //   console.log("title", title);
  //   console.log("description", description);
  //   console.log("hasPermission", hasPermission);
  //   console.log("hasPhoto", hasPhoto);
  console.log("seePhotoI", seePhoto);
  console.log("seePhoto typeof", typeof seePhoto);

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
      }
    }
    askPermissions();
  }, []);

  const onPressButton = () => {
    setVisible(true);
    setHasPhoto(false);
  };

  onPressScreen = (evt) => {
    "#1mapDispatchToProps#onClickAddPoi#onPressScreen";
    // console.log("evt.nativeEvent", evt.nativeEvent);
    const lat = evt.nativeEvent.coordinate.latitude;
    const long = evt.nativeEvent.coordinate.longitude;
    // console.log("lat", lat);
    // console.log("long", long);
    if (addPOI) {
      setListPOI([
        ...listPOI,
        { lat, long, title, description, photo: props.photo },
      ]),
        props.onAddPoiOnMap(lat, long);
      setAddPOI(false);
    }
  };

  const chatSubmit = () => {
    props.navigation.navigate("Chat");
  };

  const contactsSubmit = () => {
    props.navigation.navigate("Contacts");
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
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      console.log("status", status);
      setHasPermission(status === "granted");
      setVisible(false);
      setAddPOI(true);
      setHasPhoto(true);
    })();
    props.navigation.navigate("Camera");
  };

  let poiPhoto;
  const onPressMarker = () => {
    console.log("#onpressmarker");
    console.log("seePhoto", seePhoto);
    // if (seePhoto) {
    //   setSeePhoto(false);
    // } else {
    //   setSeePhoto(true);
    // }
    setSeePhoto(!seePhoto);
  };

  let image = null;
  if (seePhoto) {
    image = (
      <View
        style={{
          // flex:1,
          // flexDirection: "row",
          height: 25,
          width: 100,
          backgroundColor: "white",
          position:"absolute"
        }}
      >
        <Image
          source={{
            uri: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
          }}
          style={{
            height: "100%",
            width: "70%",
            marginHorizontal: "15%",
          }}
        />
      </View>
    );
  } 

  // return(
  //   <Image
  //   source = {{
  //     uri:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.femmeactuelle.fr%2Fsante%2Fnews-sante%2Fvue-mer-ameliore-moral-29734&psig=AOvVaw0pjTyJhFxIsbQWFHaI9rxx&ust=1646395923993000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCICN-oH1qfYCFQAAAAAdAAAAABAN"
  //   }}
  //   style={{
  //     height: 100,
  //     marginTop: 10,
  //     width: 100,
  //     }}
  //   />)

  // if (hasPermission) {
  //   ;
  // }

  const tabListPOI = props.poi.map((poi, index) => {
    poiPhoto = poi.photo;
    // if(poi) {
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
          // source={{uri:poi.photo}}
        ></Marker>

        {/* <Image
              source = {{
                uri:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.femmeactuelle.fr%2Fsante%2Fnews-sante%2Fvue-mer-ameliore-moral-29734&psig=AOvVaw0pjTyJhFxIsbQWFHaI9rxx&ust=1646395923993000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCICN-oH1qfYCFQAAAAAdAAAAABAN"
              }}
              style={{
                height: 100,
                marginTop: 10,
                width: 100,
                }}
              /> */}

        {/* <Image
          source={{uri:poi.photo}}
          style={{
            height: 100,
            marginTop: 10,
            width: 100,
            }}
        /> */}
      </View>
    );
    // }
  });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      
      <MapView
        onPress={(evt) => onPressScreen(evt)}
        initialRegion={{
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{
          flex: 1,
          // flexDirection:"row",
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
        {/* <Button title="Contacts" onPress={() => contactsSubmit()} /> */}
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
      console.log("#1mapDispatchToProps#onClickAddPoi");
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
  console.log("mapStateToProps");
  return {
    poi: state.poi,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
