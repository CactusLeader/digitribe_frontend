import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function ProfileCreationScreen() {
  return (
    <View style={styles.container}>
      <TextInput value="" placeholder="Username" />
      <TextInput value="" placeholder="Last Name" />
      <TextInput value="" placeholder="First Name" />
      <TextInput value="" placeholder="Email" />
      <TextInput value="" placeholder="Password" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
