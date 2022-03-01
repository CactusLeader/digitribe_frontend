import React from "react";
import { Button } from "react-native-elements";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";

<DigiButtonIcon
  buttonStyle={{
    backgroundColor: "#FFD440",
  }}
  icon={
    <Icon
      name={props.name}
      type={props.type}
      color={props.color}
      size={25}
      iconStyle={{ marginRight: 10 }}
    />
  }
  title={props.title}
  onPress={() => onPressAddPoi()}
/>;
