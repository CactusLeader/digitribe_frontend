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
import Button from "../utils/ButtonFinal.js";

function AccountCreationScreen(props) {
  // const [username, setUsername] = useState("");
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

  const onChange = (event, value) => {
    setBirthdate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  // const handleUsername = (val) => {
  //   setUsername(val);
  // };

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
    const personnalInfo = {
      // username,
      lastname,
      firstname,
      birthdate,
      email,
      password,
    };
    props.onPersonnalInfoClick(personnalInfo);
    if (!lastname.trim()) {
      alert("Veuillez entrer votre nom !");
      return;
    }
    if (!firstname.trim()) {
      alert("Veuillez entrer votre prénom !");
      return;
    }
    if (!email.trim()) {
      alert("Veuillez entrer votre email !");
      return;
    }
    if (!password.trim()) {
      alert("Veuillez entrer un mot de passe !");
      return;
    }
    if (lastname && firstname && birthdate && email && password) {
      props.navigation.navigate("Focus");
    }
  };

  const handleBirthdate = () => {
    console.log(birthdate);
    setIsPickerShow(true);
    setVisible(true);
  };

  return (
    <ImageBackground
      source={require("../assets/2.png")}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>Créer un compte</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <View style={styles.inner}>
              {/* <Input
              value={username}
              onChangeText={(val) => handleUsername(val)}
              placeholder="Pseudo"
              leftIcon={<Ionicons name="body" size={24} color="#FFD440" />}
              label="Pseudo"
              labelStyle={styles.label}
            /> */}
              <Input
                value={lastname}
                onChangeText={(val) => handleLastname(val)}
                placeholder="Nom de famille"
                leftIcon={
                  <Ionicons name="md-person-circle" size={24} color="#8525FF" />
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
                    color="#8525FF"
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
                    color="#8525FF"
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
                leftIcon={<Ionicons name="mail" size={24} color="#8525FF" />}
                label="Email"
                labelStyle={styles.label}
              />
              <Input
                value={password}
                onChangeText={(val) => handlePassword(val)}
                placeholder="Mot de passe"
                leftIcon={
                  <Ionicons name="lock-closed" size={24} color="#8525FF" />
                }
                label="Mot de passe"
                labelStyle={styles.label}
              />
              <Button
                title="Suivant"
                onPress={() => accountSubmit()}
                titleStyle={{
                  color: "white",
                  fontSize: 25,
                  fontFamily: 'normal',
                }}
                containerStyle={{
                  width: 250,
                  marginVertical:40
                }}
              />
            </View>
          </KeyboardAvoidingView>
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
    fontFamily: 'normal',
   
  },
  header: {
    color: "white",
    fontSize: 32,
    marginBottom: 48,
    alignSelf: "center",
    marginTop: "20%",
    fontFamily: 'bold' 
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
