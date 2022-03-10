import React, { useState, useContext } from "react";
import { Input as RNEInput, ThemeContext } from "react-native-elements";

function Input(props) {
  const [focused, setFocused] = useState(false);
  const [showPasswordText, togglePasswordText] = useState(
    props.password ? false : true
  );

  const onFocus = () => {
    setFocused(true);
    props.onFocus();
  };

  const onBlur = () => {
    setFocused(false);
    props.onBlur();
  };

  const inputContainerStyle = {
    ...props.inputContainerStyle,
    ...(focused ? { borderColor: "#FFD440" } : {}),
  };

  const labelStyle = {
    ...props.labelStyle,
    ...(focused ? { color: "#FFD440" } : {}),
  };

  const leftIcon = {
    ...props.leftIcon,
    ...(focused ? { color: "#FFD440" } : {}),
  };

  let rightIcon = {
    ...props.rightIcon,
    ...(focused ? { color: "#FFD440" } : {}),
  };

  if (props.password) {
    let passwordToggler = {
      type: "ionicon",
      name: showPasswordText ? "ios-eye" : "ios-eye-off",
      onPress: () => togglePasswordText(!showPasswordText),
      containerStyle: { marginRight: 10 },
      underlayColor: "transparent",
    };

    rightIcon = {
      ...rightIcon,
      ...passwordToggler,
    };
  }

  return (
    <RNEInput
      {...props}
      onFocus={onFocus}
      onBlur={onBlur}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      //   inputContainerStyle={inputContainerStyle}
      labelStyle={labelStyle}
      secureTextEntry={showPasswordText ? false : true}
    />
  );
}

Input.defaultProps = {
  onFocus: () => null,
  onBlur: () => null,
  leftIcon: {},
  rightIcon: {},
  labelStyle: {},
  password: false,
  secureTextEntry: false,
};

export default Input;
