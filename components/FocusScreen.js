import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import Button from "../utils/Button.js";

export default function FocusScreen(props) {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [check6, setCheck6] = useState(false);
  const [check7, setCheck7] = useState(false);
  const [check8, setCheck8] = useState(false);

  const focusSubmit = () => {
    props.navigation.navigate("ProfileCreation");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.innerHeader}>
          Bienvenue "utilisateur" ! Quels sont vos centres d'intérêts ? ;)
        </Text>
      </View>
      <CheckBox
        title="Sport"
        checked={check1}
        checkedColor="#FFD440"
        style={{styles.checkBox}}
        onPress={() => setCheck1(!check1)}
      />
      <CheckBox
        title="Cinema"
        checked={check2}
        checkedColor="#FFD440"
        onPress={() => setCheck2(!check2)}
      />
      <CheckBox
        title="Musique"
        checked={check3}
        checkedColor="#FFD440"
        onPress={() => setCheck3(!check3)}
      />
      <CheckBox
        title="Lecture"
        checked={check4}
        checkedColor="#FFD440"
        onPress={() => setCheck4(!check4)}
      />
      <CheckBox
        title="Théatre"
        checked={check5}
        checkedColor="#FFD440"
        onPress={() => setCheck5(!check5)}
      />
      <CheckBox
        title="Cuisine"
        checked={check6}
        checkedColor="#FFD440"
        onPress={() => setCheck6(!check6)}
      />
      <CheckBox
        title="Voyages"
        checked={check7}
        checkedColor="#FFD440"
        onPress={() => setCheck7(!check7)}
      />
      <CheckBox
        title="Programmation"
        checked={check8}
        checkedColor="#FFD440"
        onPress={() => setCheck8(!check8)}
      />
      <Button title="Suivant" onPress={() => focusSubmit()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    marginTop: "12%",
  },
  innerHeader: {
    color: "#8525FF",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 48,
  },
  checkbox: {
    alignItems: "flex-start",
  },
});
