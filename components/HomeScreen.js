import React from "react";
import { StyleSheet, ImageBackground, Image, View } from "react-native";
import { Button } from "react-native-elements";
// import Button from "../utils/Button.js";

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
      source={require("../assets/DigiBackground1.png")}
      style={styles.container}
    >
      
      <View
        style={{
          flex: 1,
          justifyContent :'center',
          marginTop:250
        }}
      >
        {/* <Button title="Sign up" onPress={() => signupSubmit()} />
        <Button title="Login" onPress={() => loginSubmit()} /> */}

        <Button
          title="Sign-up"
          titleStyle={{
            color: "white",
            fontSize: 25,
          }}
          buttonStyle={{
            backgroundColor: "#8525FF",
            borderRadius: 100,
          }}
          
          onPress={() => signupSubmit()}
          type="outline"
          containerStyle={{
            marginBottom: 20,
            width: 225,
          }}
        />
        <Button
          title="Login"
          titleStyle={{
            color: "white",
            fontSize: 25,
          }}
          buttonStyle={{
            borderRadius: 100,
            backgroundColor: "#8525FF",
          }}
    
          onPress={() => loginSubmit()}
          type="outline"
          containerStyle={{
            width: 225,
          }}
        />
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
