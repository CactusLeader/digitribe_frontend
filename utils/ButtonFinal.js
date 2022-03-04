import React from "react";
import { Button } from "react-native-elements";

function DigiButtonFinal(props) {
  return (
    <Button
      title={props.title}
      titleStyle={{
        color: "white",
        fontSize: 25,
      }}
      buttonStyle={{
        backgroundColor: "#8525FF",
        borderRadius: 100,
      }}
      onPress={props.onPress}
      type="outline"
      containerStyle={{
        marginBottom: 20,
        width: 300,
      }}
    />
  );
}

export default DigiButtonFinal;
