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
        backgroundColor: "#7D4FF4",
      }}
      onPress={props.onPress}
    />
  );
}

export default DigiButton;
