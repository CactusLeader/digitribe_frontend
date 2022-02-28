import React, { useState } from "react";
import { StyleSheet, ImageBackground, Text, View } from "react-native";
import { Input } from "react-native-elements";

import Button from "../utils/Button.js";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [listErrorsLogin, setErrorsLogin] = useState([]);

  const MapSubmit = async () => {
    console.log("#1");

    const data = fetch("http://192.168.148.169:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${email}&password=${password}`,
    });
    const body = await data.json();

    console.log("body", body);

    if (body.result === true) {
      props.addToken(body.token);
      setUserExists(true);
    } else {
      setErrorsLogin(body.error);
    }
  };

  if (userExists) {
    console.log("Page Map");
    props.navigation.navigate("Map");
  }

  const tabErrorsLogin = listErrorsLogin.map((error, i) => {
    return <Text>{error}</Text>;
  });

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
      {tabErrorsLogin}
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