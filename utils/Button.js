import React from "react";
import { Button } from "react-native-elements";

function DigiButton(props) {
  return (
    <Button
      title={props.title}
      containerStyle={{
        width: 200,
        marginHorizontal: 50,
        marginVertical: 10,
      }}
      buttonStyle={{
        backgroundColor: "#8525FF",
      }}
      onPress={props.onPress}
      icon={props.icon}
      iconContainerStyle={props.iconContainerStyle}
      titleStyle={props.titleStyle}
    />
  );
}

export default DigiButton;
