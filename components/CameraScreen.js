import { Camera } from "expo-camera";
import { View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Button } from "react-native-elements";

function CameraScreen(props) {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.torch);

  return (
    <Camera
      style={{
        flex: 1,
      }}
      type={type}
      flashMode={flash}
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
              marginRight: 10,
              marginLeft: 15,
              marginVertical: 10,
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
              marginVertical: 10,
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
      </View>
    </Camera>
  );
}

export default CameraScreen;
