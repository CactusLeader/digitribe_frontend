import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { CheckBox } from "react-native-elements";
import Button from "../utils/Button.js";

function FocusScreen(props) {
  const [interestsList, setInterestsList] = useState([]);
  const [resInterest, setResInterest] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [check6, setCheck6] = useState(false);
  const [check7, setCheck7] = useState(false);
  const [check8, setCheck8] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  console.log("selectedInterests", selectedInterests);

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch("http://172.20.10.3:3000/signup");
      var responseInterest = await rawResponse.json();
      setInterestsList(responseInterest.interests);
      // console.log(responseInterest);
      // console.log("interestsList", interestsList);
    }
    loadData();
  }, []);

  const handleCheckInterests = (val) => {
    console.log("val", val);
    if (selectedInterests.includes(val)) {
      setSelectedInterests(selectedInterests.filter((el) => el !== val));
    } else {
      setSelectedInterests([...selectedInterests, val]);
    }
  };

  const interests = interestsList.map((interest, index) => {
    // console.log("interest ok");
    let check = false;
    if (selectedInterests.includes(interest._id)) {
      check = true;
    } else {
      check = false;
    }

    return (
      <CheckBox
        key={index}
        title={interest.name}
        checked={check}
        checkedColor="#FFD440"
        onPress={() => handleCheckInterests(interest._id)}
      />
    );
  });

  const focusSubmit = () => {
    props.navigation.navigate("ProfileCreation");
    props.onPersonnalInfoClick(selectedInterests);
  };

  return (
    <ImageBackground
      source={require("../assets/DigitribeBackground2.png")}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.innerHeader}>Bienvenue "utilisateur"!</Text>
        <Text style={styles.innerSubHeader}>
          Quels sont vos centres d'intérêts ? ;)
        </Text>
      </View>
      {interests}
      <View style={styles.button}>
        <Button
          buttonStyle={{ justifyContent: "center" }}
          title="Suivant"
          onPress={() => focusSubmit()}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },
  header: {
    marginTop: "15%",
  },
  innerHeader: {
    color: "#8525FF",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 54,
    textAlign: "center",
  },
  innerSubHeader: {
    color: "#8525FF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    onPersonnalInfoClick: function (personnalInfo) {
      dispatch({ type: "personnalInfo", personnalInfo });
    },
  };
}

export default connect(null, mapDispatchToProps)(FocusScreen);
