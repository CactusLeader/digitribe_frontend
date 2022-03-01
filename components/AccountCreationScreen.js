import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { Overlay } from "react-native-elements";
import { connect } from "react-redux";
import { Input } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import Button from "../utils/Button.js";

function AccountCreationScreen(props) {
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [birthdate, setBirthdate] = useState(new Date(Date.now()));
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setBirthdate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const handleUsername = (val) => {
    setUsername(val);
  };

  const handleLastname = (val) => {
    setLastname(val);
  };

  const handleFirstname = (val) => {
    setFirstname(val);
  };

  const handleEmail = (val) => {
    setEmail(val);
  };

  const handlePassword = (val) => {
    setPassword(val);
  };

  const accountSubmit = () => {
    props.navigation.navigate("Focus");
    const personnalInfo = {
      username,
      lastname,
      firstname,
      birthdate,
      email,
      password,
    };
    props.onPersonnalInfoClick(personnalInfo);
  };

  const handleBirthdate = () => {
    console.log(birthdate);
    setIsPickerShow(true);
    setVisible(true);
  };

  return (
    <ImageBackground
      source={require("../assets/home.jpg")}
      style={styles.container}
    >
      <KeyboardAvoidingView
        //   behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.header}>Créer un compte</Text>
            <Input
              value={username}
              onChangeText={(val) => handleUsername(val)}
              placeholder="Pseudo"
              leftIcon={<Ionicons name="body" size={24} color="#FFD440" />}
              label="Pseudo"
              labelStyle={styles.label}
            />
            <Input
              value={lastname}
              onChangeText={(val) => handleLastname(val)}
              placeholder="Nom de famille"
              leftIcon={
                <Ionicons name="md-person-circle" size={24} color="#FFD440" />
              }
              label="Nom de famille"
              labelStyle={styles.label}
            />
            <Input
              value={firstname}
              onChangeText={(val) => handleFirstname(val)}
              placeholder="Prénom"
              leftIcon={
                <Ionicons
                  name="md-person-circle-outline"
                  size={24}
                  color="#FFD440"
                />
              }
              label="Prénom"
              labelStyle={styles.label}
            />
            <Input
              value={birthdate.toDateString()}
              onFocus={() => handleBirthdate()}
              placeholder="Date de naissance"
              leftIcon={
                <Ionicons
                  name="md-person-circle-outline"
                  size={24}
                  color="#FFD440"
                />
              }
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
              leftIcon={<Ionicons name="mail" size={24} color="#FFD440" />}
              label="Email"
              labelStyle={styles.label}
            />
            <Input
              value={password}
              onChangeText={(val) => handlePassword(val)}
              placeholder="Mot de passe"
              leftIcon={
                <Ionicons name="lock-closed" size={24} color="#FFD440" />
              }
              label="Mot de passe"
              labelStyle={styles.label}
            />
            <Button title="Suivant" onPress={() => accountSubmit()} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    alignItems: "center",
    marginTop: "15%",
  },
  textInput: {
    marginTop: "12%",
  },
  label: {
    color: "#FFD440",
  },
  header: {
    color: "#8525FF",
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 48,
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
    onPersonnalInfoClick: function () {
      dispatch({ type: "personnalInfo" });
    },
  };
}

export default connect(null, mapDispatchToProps)(AccountCreationScreen);
