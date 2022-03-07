import React, { useState } from "react";
import { StyleSheet, ImageBackground, Text, View } from "react-native";
import { Input } from "react-native-elements";

import Button from "../utils/ButtonFinal.js";

import { connect } from "react-redux";

function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userExists, setUserExists] = useState(false);
  const [listErrorsLogin, setErrorsLogin] = useState([]);
  // const [firstname, setFirstname] = useState("");

  const MapSubmit = async () => {
    const data = await fetch("https://digitribebackend.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${email}&password=${password}`,
    });

    const body = await data.json();

    // console.log("body", body);

    if (body.result === true) {
      // setUserExists(true);
      // setFirstname(body.user.firstname);
      props.addToken(body.token);
      props.onSubmitFirstname(body.user.firstname);
      props.navigation.navigate("Map");
    } else {
      setErrorsLogin(body.error);
    }
  };

  // if (userExists) {
  //   console.log("Page Map");
  // }

  const tabErrorsLogin = listErrorsLogin.map((error, i) => {
    return (
      <Text
        style={{
          color: "red",
        }}
      >
        {error}
      </Text>
    );
  });

  return (
    <ImageBackground
      source={require("../assets/2.png")}
      style={styles.container}
    >
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          color: "#8525FF",
          marginBottom: 30,
          marginTop: -50,
        }}
      >
        Login
      </Text>
      {tabErrorsLogin}
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Email"
        onChangeText={(val) => setEmail(val)}
      />
      <Input
        containerStyle={{ marginVertical: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Password"
        onChangeText={(val) => setPassword(val)}
      />
      <Button
        title="Se login et continuer"
        containerStyle={{
          width: 270,
          marginTop: 50,
        }}
        titleStyle={{
          color: "white",
          fontSize: 25,
        }}
        onPress={() => MapSubmit()}
      />
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

function mapDispatchToProps(dispatch) {
  return {
    onSubmitFirstname: function (firstname) {
      // console.log("usduibvisdbibsdbi #1 firstName", firstname);
      dispatch({
        type: "saveFirstname",
        firstname: firstname,
      });
    },
    addToken: function (token) {
      dispatch({ type: "addToken", token: token });
    },
  };
}

export default connect(null, mapDispatchToProps)(LoginScreen);
