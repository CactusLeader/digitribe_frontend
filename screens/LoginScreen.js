import React, { useState } from "react";
import { StyleSheet, ImageBackground, Text, View } from "react-native";
import { Input } from "react-native-elements";

import Button from "../utils/Button.js";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const MapSubmit = () => {
    console.log("Page Map");
    fetch("http://localhost:3000/MapScreen", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${email}&email=${password}`,
    });
    console.log("email", email);
    console.log("password", password);
  };

  return (
    <ImageBackground
      source={require("../assets/home.jpg")}
      style={styles.container}
    >
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          color: "#7D4FF4",
          marginBottom: 30,
          marginTop: -50,
        }}
      >
        Login
      </Text>
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Email"
        onChangeText={(val) => setEmail(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Password"
        onChangeText={(val) => setPassword(val)}
      />
      <Button title="Se login et continuer" onPress={() => MapSubmit()} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
