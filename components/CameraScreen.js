import { Camera } from "expo-camera";
import { View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-elements";

function CameraScreen(props) {
  const [type, setType] = useState(Camera.Constants.Type.back);

  return (
    <Camera
      style={{
        flex: 1,
        flexDirection: "row",
      }}
      type={type}
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
            marginHorizontal: 20,
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
    </Camera>
  );
}

export default CameraScreen;
