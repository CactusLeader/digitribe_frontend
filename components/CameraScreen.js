import { Camera } from "expo-camera";
import { View, TouchableOpacity, DatePickerIOSBase } from "react-native";
import { useState } from "react";
import { Button } from "react-native-elements";

function CameraScreen(props) {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  const onPressPhoto = async () => {
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
      var rawResponse = await fetch("http://172.20.10.5:3000/place", {
        method: "post",
        body: data,
      });
      var response = await rawResponse.json();
      console.log('response', response);
    }
  };

  return (
    <Camera
      style={{
        flex: 1,
      }}
      type={type}
      flashMode={flash}
      ref={(ref) => (cameraRef = ref)}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginBottom: 20,
            }}
          >
            <Button
              icon={{
                name: "flip-camera-ios",
                type: "material-icons",
                size: 25,
                color: "white",
              }}
              buttonStyle={{
                backgroundColor: "#FFD440",
                borderRadius: 100,
                borderColor: "white",
                borderWidth: 2,
                width: 60,
                height: 60,
              }}
              containerStyle={{
                marginRight: 5,
                marginLeft: 10,
                marginVertical: 5,
              }}
              onPress={() => {
                setType(
                  type == Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginBottom: 20,
            }}
          >
            <Button
              icon={{
                name: "flash",
                type: "font-awesome",
                size: 25,
                color: "white",
              }}
              buttonStyle={{
                backgroundColor: "#FFD440",
                borderRadius: 100,
                borderColor: "white",
                borderWidth: 2,
                width: 60,
                height: 60,
              }}
              containerStyle={{
                marginVertical: 5,
              }}
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.torch
                    ? Camera.Constants.FlashMode.off
                    : Camera.Constants.FlashMode.torch
                );
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                marginBottom: 20,
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
                  borderWidth: 2,
                  width: 75,
                  height: 75,
                  marginRight: 5,
                  marginLeft: 10,
                  marginVertical: 20,
                }}
                onPress={() => onPressPhoto()}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Camera>
  );
}

export default CameraScreen;
