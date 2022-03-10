import React, { useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { Overlay } from "react-native-elements";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../utils/Input.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../utils/ButtonFinal.js";

function AccountCreationScreen(props) {
  const [lastname, setLastname] = useState("");
  const [lastnameCheck, setLastnameCheck] = useState(true);
  const [firstname, setFirstname] = useState("");
  const [firstnameCheck, setFirstnameCheck] = useState(true);
  const [email, setEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState(true);

  const [birthdate, setBirthdate] = useState(new Date(Date.now()));
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const onChange = (event, value) => {
    setBirthdate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const handleLastname = (val) => {
    setLastname(val.trim());
  };

  const handleFirstname = (val) => {
    setFirstname(val.trim());
  };

  const handleEmail = (val) => {
    setEmail(val.trim());
  };

  const handlePassword = (val) => {
    setPassword(val.trim());
  };

  const accountSubmit = () => {
    if (!lastname) {
      setLastnameCheck(false);
    } else if (lastname) {
      setLastnameCheck(true);
    }
    if (!firstname) {
      setFirstnameCheck(false);
    } else if (firstname) {
      setFirstnameCheck(true);
    }
    if (
      !email ||
      !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      setEmailCheck(false);
    } else if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setEmailCheck(true);
    }
    if (!password || password.length < 6) {
      setPasswordCheck(false);
    } else if (password.length >= 6) {
      setPasswordCheck(true);
    }

    if (lastname && firstname && birthdate && email && password) {
      const personnalInfo = {
        lastname,
        firstname,
        birthdate,
        email,
        password,
      };
      props.onPersonnalInfoClick(personnalInfo);
      props.navigation.navigate("Focus");
    }
  };

  const handleBirthdate = () => {
    setIsPickerShow(true);
    setVisible(true);
  };

  return (
    <ImageBackground
      source={require("../assets/2.png")}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View contentContainerStyle={styles.container}>
          <Text style={styles.header}>Créer un compte</Text>
          <KeyboardAwareScrollView>
            <View style={styles.inner}>
              <Input
                value={lastname}
                onChangeText={(val) => handleLastname(val)}
                placeholder="Nom de famille"
                leftIcon={{
                  type: "ionicon",
                  name: "md-person-circle",
                  size: 24,
                  color: "#8525FF",
                }}
                label="Nom de famille"
                labelStyle={styles.label}
                errorStyle={{ color: "red" }}
                errorMessage={!lastnameCheck ? "Veuillez entrez votre nom" : ""}
              />
              <Input
                value={firstname}
                onChangeText={(val) => handleFirstname(val)}
                placeholder="Prénom"
                leftIcon={{
                  type: "ionicon",
                  name: "md-person-circle-outline",
                  size: 24,
                  color: "#8525FF",
                }}
                label="Prénom"
                labelStyle={styles.label}
                errorStyle={{ color: "red" }}
                errorMessage={
                  !firstnameCheck ? "Veuillez entrer votre prénom" : ""
                }
              />
              <Input
                value={birthdate.toDateString()}
                onFocus={() => handleBirthdate()}
                placeholder="Date de naissance"
                leftIcon={{
                  type: "ionicon",
                  name: "calendar",
                  size: 24,
                  color: "#8525FF",
                }}
                label="Date de naissance"
                labelStyle={styles.label}
              />
              <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                {isPickerShow && (
                  <DateTimePicker
                    locale="fr-fr"
                    value={birthdate}
                    mode={"date"}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    is24Hour={true}
                    onChange={onChange}
                    style={styles.datePicker}
                  />
                )}
              </Overlay>
              <Input
                value={email}
                onChangeText={(val) => handleEmail(val)}
                placeholder="Email"
                leftIcon={{
                  type: "ionicon",
                  name: "mail",
                  size: 24,
                  color: "#8525FF",
                }}
                label="Email"
                labelStyle={styles.label}
                errorStyle={{ color: "red" }}
                errorMessage={
                  !emailCheck ? "Veuillez entrez une adresse email valide" : ""
                }
              />
              <Input
                value={password}
                onChangeText={(val) => handlePassword(val)}
                placeholder="Mot de passe"
                leftIcon={{
                  type: "ionicon",
                  name: "lock-closed",
                  size: 24,
                  color: "#8525FF",
                }}
                label="Mot de passe"
                labelStyle={styles.label}
                password={true}
                errorStyle={{ color: "red" }}
                errorMessage={!passwordCheck ? "Mot de passe trop court" : ""}
              />
              <Button
                title="Suivant"
                onPress={() => accountSubmit()}
                titleStyle={{
                  color: "white",
                  fontSize: 25,
                  fontFamily: "normal",
                }}
                containerStyle={{
                  width: 270,
                  marginVertical: 40,
                }}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
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
    justifyContent: "space-around",
    alignItems: "center",
  },
  label: {
    color: "#8525FF",
    fontFamily: "normal",
  },
  header: {
    color: "white",
    fontSize: 32,
    marginBottom: 48,
    alignSelf: "center",
    marginTop: "20%",
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
    onPersonnalInfoClick: function (personnalInfo) {
      dispatch({ type: "addPersonnalInfo", personnalInfo });
    },
  };
}

export default connect(null, mapDispatchToProps)(AccountCreationScreen);
