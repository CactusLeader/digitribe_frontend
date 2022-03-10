import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { connect } from "react-redux";
import { CheckBox, Button } from "react-native-elements";
// import Button from "../utils/ButtonFinal.js";

function FocusScreen(props) {
  const [interestsList, setInterestsList] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(
        "https://digitribebackend.herokuapp.com/signup"
      );
      var responseInterest = await rawResponse.json();
      setInterestsList(responseInterest.interests);
      // console.log(responseInterest);
      // console.log("interestsList", interestsList);
    }
    loadData();
  }, []);

  const handleCheckInterests = (val) => {
    // console.log("val", val);
    if (selectedInterests.includes(val)) {
      setSelectedInterests(selectedInterests.filter((el) => el !== val));
    } else {
      setSelectedInterests([...selectedInterests, val]);
    }
  };

  const interests = interestsList.map((interest, index) => {
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
    if (selectedInterests.length === 0) {
      alert("Veuillez séléctionner au moins un centre d'intérêt !");
    } else {
      props.navigation.navigate("ProfileCreation");
      props.onPersonnalInfoClick(selectedInterests);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/3.png")}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.innerHeader}>Bienvenue {props.firstname}!</Text>
        <Text style={styles.innerSubHeader}>
          Quels sont vos centres d'intérêts ? 
        </Text>
      </View>
      {interests}
      <View style={styles.button}>
        <Button
          title="Suivant"
          titleStyle={{
            color: "white",
            fontSize: 25,
            fontFamily: "normal",
          }}
          buttonStyle={{
            backgroundColor: "#FFD440",
            borderRadius: 100,
            borderColor: "white",
            borderWidth: 0.5,
          }}
          onPress={() => focusSubmit()}
          type="outline"
          containerStyle={{
            marginBottom: 200,
            width: 250,
          }}
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
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 90,
    textAlign: "center",
    fontFamily: "bold",
  },
  innerSubHeader: {
    color: "#FFD440",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 60,
    textAlign: "center",
    fontFamily: "bold",
  },
  button: {
    alignItems: "center",
    marginVertical: 120,
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
