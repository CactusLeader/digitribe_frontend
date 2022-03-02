import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { CheckBox } from "react-native-elements";
import Button from "../utils/Button.js";

function FocusScreen(props) {
  const [interestsList, setInterestsList] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);

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
    if (selectedInterests.length === 1) {
      alert("Veuillez séléctionner au moins un centre d'intérêt !");
    } else {
      props.navigation.navigate("ProfileCreation");
      props.onPersonnalInfoClick(selectedInterests);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/home.jpg")}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.innerHeader}>Bienvenue {props.firstname}!</Text>
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
  },
  header: {
    marginTop: "15%",
  },
  innerHeader: {
    color: "#8525FF",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 70,
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

function mapStateToProps(state) {
  return { firstname: state.account.firstname };
}

function mapDispatchToProps(dispatch) {
  return {
    onPersonnalInfoClick: function (selectedInterests) {
      dispatch({ type: "addInterests", selectedInterests });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FocusScreen);
