import React from "react";
import { StyleSheet, ImageBackground, Image, View } from "react-native";
// import { Button } from "react-native-elements";
import Button from "../utils/Button.js";

function HomeScreen(props) {
  const loginSubmit = () => {
    console.log("Page Login");
    props.navigation.navigate("Login");
  };
  const signupSubmit = () => {
    props.navigation.navigate("AccountCreation");
  };

  return (
    <ImageBackground
      source={require("../assets/DigitribeBackground.jpg")}
      style={styles.container}
    >
      
      <View
        style={{
          flex: 1,
          justifyContent :'center',
          marginTop:200
        }}
      >
        <Button title="Sign up" onPress={() => signupSubmit()} />
        <Button title="Login" onPress={() => loginSubmit()} />

        {/* <Button
          title="Sign-up"
          titleStyle={{
            color: "#7D4FF4",
            fontSize: 25,
          }}
          buttonStyle={{
            color: "transparent",
            borderRadius: 100,
            borderColor: "#7D4FF4",
            borderWidth: 2,
          }}
          icon={{
            name: "hand-pointer",
            type: "font-awesome-5",
            size: 20,
            marginRight: 10,
            color: "#7D4FF4",
          }}
          onPress={() => signupSubmit()}
          type="outline"
          containerStyle={{
            marginBottom: 20,
            width: 200,
            borderColor: "#7D4FF4",
          }}
        />
        <Button
          title="Login"
          titleStyle={{
            color: "#7D4FF4",
            fontSize: 25,
          }}
          buttonStyle={{
            color: "transparent",
            borderRadius: 100,
            borderColor: "#7D4FF4",
            borderWidth: 2,
          }}
          icon={{
            name: "login",
            type: "ant-design",
            size: 20,
            marginRight: 10,
            color: "#7D4FF4",
          }}
          onPress={() => loginSubmit()}
          type="outline"
          containerStyle={{
            marginBottom: 20,
            width: 200,
            borderColor: "#7D4FF4",
          }}
        /> */}
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
