import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
} from "react-native";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

export default function AccountCreationScreen() {
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
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
            placeholder="Username"
            leftIcon={<Ionicons name="body" size={24} color="#FFD440" />}
            label="Username"
            labelStyle={styles.label}
          />
          <Input
            value={lastname}
            onChangeText={(val) => handleLastname(val)}
            placeholder="Last Name"
            leftIcon={
              <Ionicons name="md-person-circle" size={24} color="#FFD440" />
            }
            label="Last Name"
            labelStyle={styles.label}
          />
          <Input
            value={firstname}
            onChangeText={(val) => handleFirstname(val)}
            placeholder="First Name"
            leftIcon={
              <Ionicons
                name="md-person-circle-outline"
                size={24}
                color="#FFD440"
              />
            }
            label="First Name"
            labelStyle={styles.label}
          />
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
            placeholder="Password"
            leftIcon={<Ionicons name="lock-closed" size={24} color="#FFD440" />}
            label="Password"
            labelStyle={styles.label}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
});
