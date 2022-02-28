import React from "react";
import { StyleSheet, ImageBackground, Image, View } from "react-native";

import Button from "../utils/Button.js";

function HomeScreen(props) {
  const LoginSubmit = () => {
    console.log("Page Login");
    props.navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require("../assets/home.jpg")}
      style={styles.container}
    >
      <Image
        source={require("../assets/logoDigistribe.png")}
        style={{
          width: "90%",
        }}
      />
      <View
        style={{
          flex: 1,
          marginTop: -120,
        }}
      >
        <Button title="Sign up" />
        <Button title="Login" onPress={() => LoginSubmit()} />
      </View>
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

export default HomeScreen;