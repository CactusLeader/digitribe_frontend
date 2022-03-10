import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
// import { Input } from "react-native-elements";
import Input from "../utils/Input.js";
import Button from "../utils/ButtonFinal.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { connect } from "react-redux";

function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [listErrorsLogin, setErrorsLogin] = useState([]);
  const [emailCheck, setEmailCheck] = useState(true);
  const [passwordCheck, setPasswordCheck] = useState(true);

  const MapSubmit = async () => {
    if (
      !email ||
      !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      setEmailCheck(false);
    } else if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setEmailCheck(true);
    }
    if (!password) {
      setPasswordCheck(false);
    } else if (password) {
      setPasswordCheck(true);
    }

    if (emailCheck && passwordCheck) {
      const data = await fetch("https://digitribebackend.herokuapp.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${email}&password=${password}`,
      });

      const body = await data.json();

      if (body.result === true) {
        props.addToken(body.token);
        props.onSubmitFirstname(body.user.firstname);
        props.navigation.navigate("BottomNavigator", { screen: "Map" });
      } else {
        setErrorsLogin(body.error);
      }
    }
  };

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
      <Text style={styles.header}>Créer un compte</Text>
      {tabErrorsLogin}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView contentContainerStyle={styles.inner}>
          <Input
            value={email}
            placeholder="Email"
            onChangeText={(val) => setEmail(val)}
            label="Email"
            leftIcon={{
              type: "ionicon",
              name: "mail",
              size: 24,
              color: "#8525FF",
            }}
            errorStyle={{ color: "red" }}
            errorMessage={
              !emailCheck ? "Veuillez entrer une adresse email valide" : ""
            }
          />
          <Input
            value={password}
            placeholder="Password"
            onChangeText={(val) => setPassword(val)}
            label="Mot de passe"
            leftIcon={{
              type: "ionicon",
              name: "lock-closed",
              size: 24,
              color: "#8525FF",
            }}
            password={true}
            errorStyle={{ color: "red" }}
            errorMessage={
              !passwordCheck ? "Veuillez entrer un mot de passe valide" : ""
            }
          />
          <Button
            title="Se login et continuer"
            containerStyle={{
              width: 270,
              marginTop: "20%",
            }}
            titleStyle={{
              color: "white",
              fontSize: 25,
              fontFamily: "normal",
            }}
            onPress={() => MapSubmit()}
          />
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#8525FF",
    fontFamily: "normal",
  },
  header: {
    color: "white",
    fontSize: 32,
    alignSelf: "center",
    marginTop: "14%",
    fontFamily: "bold",
  },
  datePicker: {
    width: 320,
    height: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitFirstname: function (firstname) {
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
