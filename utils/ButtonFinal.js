import React from "react";
import { Button } from "react-native-elements";

function DigiButtonFinal(props) {
  return (
    <Button
      title={props.title}
      titleStyle={props.titleStyle}
      buttonStyle={{
        backgroundColor: "#8525FF",
        borderRadius: 100,
        borderColor: "white",
        borderWidth: 0.5,
        fontFamily: 'Roboto_900Black' 
      }}
      onPress={props.onPress}
      type="outline"
      containerStyle={props.containerStyle}
    />
  );
}

export default DigiButtonFinal;
