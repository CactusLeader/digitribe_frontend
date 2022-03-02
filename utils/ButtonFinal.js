import React from "react";
import { Button } from "react-native-elements";

function DigiButtonFinal(props) {
  return (
    <Button
      title={props.title}
      titleStyle={{
        color: props,
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
      onPress={props.onPress}
      type="outline"
      containerStyle={{
        marginBottom: 20,
        width: 150,
        borderColor: props.borderColor,
      }}
    />
  );
}

export default DigiButtonFinal;
