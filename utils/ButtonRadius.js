import React from "react";
import { Button } from "react";

function DigiButtonRadius(props) {
  return (
    <Button
      icon={{
        name: props.name,
        type: props.type,
        size: 35,
        color: props.color,
      }}
      buttonStyle={{
        backgroundColor: props.backgroundColor,
        borderRadius: 100,
        borderColor: props.borderColor,
        borderWidth: 2,
        width: 65,
        height: 65,
      }}
      containerStyle={{
        marginVertical: 10,
      }}
      onPress={() => {}}
    />
  );
}

export default DigiButtonRadius;
