import { Camera } from "expo-camera";
import { View, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { useState, useEffect } from "react";
import { useIsFocused } from '@react-navigation/native';
import { Button } from "react-native-elements";
import { connect } from "react-redux";



function CameraScreen(props) {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  console.log("loading", loading);
  console.log('isFocused', isFocused)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log("status", status);
      setHasPermission(status === "granted");
    })();
  });

  const onPressPhoto = async () => {
    setLoading(true);
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync({
        quality: 0.7,
        base64: true,
        exif: true,
      });
      let data = new FormData();
      data.append("photo", {
        uri: photo.uri,
        type: "image/jpeg",
        name: "photo.jpg",
      });
      console.log("photo.uri", photo.uri);
      var rawResponse = await fetch(
        "https://digitribebackend.herokuapp.com/upload",
        {
          method: "post",
          body: data,
        }
      );
      var response = await rawResponse.json();

      if (response.url) {
        setLoading(false);
        props.navigation.navigate("BottomNavigator", { screen: "Map" });
        console.log("response", response);
        console.log("response.url", response.url);
        props.onAddPhotoClick(response.url);
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    props.navigation.navigate("map");
    return <Text>Aucun accès à la caméra</Text>;
  }

  if (loading === true && useIsFocused) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#8525FF" />
        <Text>loading</Text>
      </View>
    );
  }

  

  return (
    
    <Camera
      style={{
        flex: 1,
      }}
      type={type}
      flashMode={flash}
      ref={(ref) => (cameraRef = ref)}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Button
            icon={{
              name: "flip-camera-ios",
              type: "material-icons",
              size: 30,
              color: "white",
            }}
            buttonStyle={{
              backgroundColor: "#FFD440",
              borderRadius: 100,
              borderColor: "#FFD440",
              //   borderWidth: 6,
              width: 70,
              height: 70,
              marginLeft: 15,
              marginVertical: 15,
            }}
            onPress={() => {
              setType(
                type == Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button
            icon={{
              name: "add-a-photo",
              type: "material-icons",
              size: 35,
              color: "white",
            }}
            buttonStyle={{
              backgroundColor: "#8525FF",
              borderRadius: 100,
              borderColor: "white",
              //   borderWidth: 6,
              width: 85,
              height: 85,
              marginVertical: 30,
            }}
            onPress={() => onPressPhoto()}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Button
            icon={{
              name: "flash",
              type: "font-awesome",
              size: 30,
              color: "white",
            }}
            buttonStyle={{
              backgroundColor: "#FFD440",
              borderRadius: 100,
              borderColor: "#FFD440",
              //   borderWidth: 6,
              width: 70,
              height: 70,
              marginVertical: 5,
              marginRight: 15,
              marginVertical: 15,
            }}
            onPress={() => {
              setFlash(
                flash === Camera.Constants.FlashMode.torch
                  ? Camera.Constants.FlashMode.off
                  : Camera.Constants.FlashMode.torch
              );
            }}
          />
        </View>
      </TouchableOpacity>
    </Camera>
  );
  // }
}

function mapDispatchToProps(dispatch) {
  console.log("#1mapDispatchToProps");
  return {
    onAddPhotoClick: function (urlPhoto) {
      // console.log("#1mapDispatchToProps-onAddPhotoClick");
      dispatch({
        type: "addPhoto",
        photo: urlPhoto,
      });
    },
  };
}

export default connect(null, mapDispatchToProps)(CameraScreen);
