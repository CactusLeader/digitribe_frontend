import { Camera } from "expo-camera";
import { View } from "react-native";


function CameraScreen (props) {
    return (<View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }}></Camera>
      </View>)
}

export default CameraScreen;