import React, { useEffect, useState } from "react";
import { View, Modal, Alert, StyleSheet, Text, Pressable } from "react-native";
import { Button, Overlay, Input, Icon, Image } from "react-native-elements";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

const Stack = createStackNavigator();

function MapScreen(props) {
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);

  const [addPOI, setAddPOI] = useState(false);
  const [listPOI, setListPOI] = useState([]);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [seePhoto, setSeePhoto] = useState(false);
  const [placeList, setPlaceList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [newPoiAdded, setNewPoiAdded] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      await Location.watchPositionAsync(
        {
          distanceInterval: 10,
          accuracy: Location.Accuracy.Lowest,
          timeInterval: 60000,
        },
        (loc) => handleLocation(loc)
      );
    })();
  }, []);

  handleLocation = (loc) => {
    setCurrentLatitude(loc.coords.latitude);
    setCurrentLongitude(loc.coords.longitude);
  };

  useEffect(() => {
    (async () => {
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
        if (data.result) {
          setPlaceList(data.places);
          setUserList(data.users);
          setNewPoiAdded(false);
        }
      }
    })();
  }, [currentLatitude, currentLongitude, newPoiAdded]);

  const onPressButton = () => {
    setVisible(true);
    setHasPhoto(false);
  };

  const onPressScreen = async (evt) => {
    "#1mapDispatchToProps#onClickAddPoi#onPressScreen";

    const lat = evt.nativeEvent.coordinate.latitude;
    const long = evt.nativeEvent.coordinate.longitude;

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
      poiInfo.push(`token=${props.token}`);
      const pInfo = poiInfo.join("&");

      let rawData = await fetch(
        "https://digitribebackend.herokuapp.com/place",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: pInfo,
        }
      );
      let dataFinal = await rawData.json();
      setNewPoiAdded(true);
    }
  };

  const newPlaceList = placeList.map((place, index) => {
    if (place.location !== undefined) {
      return (
        <View key={index}>
          <Marker
            onPress={() => onPressMarker(place)}
            coordinate={{
              latitude: place.location.coordinates[1],
              longitude: place.location.coordinates[0],
            }}
            pinColor="#FFD440"
          ></Marker>
        </View>
      );
    }
  });

  const newUserList = userList.map((user, index) => {
    if (user.location !== undefined && user.token !== props.token) {
      return (
        <Marker
          key={index}
          coordinate={{
            latitude: user.location.coordinates[1],
            longitude: user.location.coordinates[0],
          }}
          title={user.firstname}
          pinColor="#8525FF"
        />
      );
    }
  });

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

  const onPressMarker = (place) => {
    setModalVisible(!modalVisible);
    setModalInfo(place);
    if (seePhoto) {
      setSeePhoto(false);
    } else {
      setSeePhoto(true);
    }
  };

  let modalPoi = null;
  if (modalInfo) {
    const isPhoto =
      modalInfo.photo !== undefined && modalInfo.photo !== "undefined";
    modalPoi = (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTextTitle}>{modalInfo.title}</Text>
              <Text style={styles.modalText}>{modalInfo.description}</Text>

              {isPhoto ? (
                <View>
                  <Image
                    source={{
                      uri: modalInfo.photo,
                    }}
                    style={{
                      width: 250,
                      height: 350,
                    }}
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <View></View>
              )}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => onPressMarker()}
              >
                <Text style={styles.textStyle}>fermer</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

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
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
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
          title="Je suis l?? !"
          pinColor="#FB33FF"
        />

        {newUserList}
        {newPlaceList}
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
            marginHorizontal: 15,
            marginVertical: 15,
          }}
          onPress={() => onPressButton()}
        />

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
              borderRadius: 100,
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
        {modalPoi}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginBottom: 120,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    top: 15,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#FFD440",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  modalTextTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 14,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    onAddPoiOnMap: function (lat, long) {
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
  return {
    poi: state.poi,
    token: state.token,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
