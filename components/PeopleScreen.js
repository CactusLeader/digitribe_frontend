import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import getAge from "../utils/age";

function PeopleScreen(props) {
  const [peopleList, setPeopleList] = useState([]);

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(
        "https://digitribebackend.herokuapp.com/profiles/users"
      );
      var responsePeople = await rawResponse.json();
      setPeopleList(responsePeople.peopleAround);
      // console.log(peopleList);
      // console.log("interestsList", interestsList);
    }
    loadData();
  }, []);

  const handleProfile = (id) => {
    props.onPeopleClick(id);
    props.navigation.navigate("PeopleProfile");
  };

  const cardList = peopleList.map((people, index) => {
    return (
      <Card containerStyle={[styles.card, styles.shadowProp]} key={index}>
        <Card.Image
          style={styles.cardImage}
          source={{
            uri: people.photo,
          }}
          onPress={() => handleProfile(people._id)}
        />
        <Card.Divider />
        <Card.Title>
          {people.firstname}, {getAge(people.birthdate)} ans
        </Card.Title>

        <Text style={styles.cardText}>{people.description}</Text>
      </Card>
    );
  });

  return (
    <ImageBackground
      source={require("../assets/3.png")}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.innerHeader}>Autour de moi...</Text>
      </View>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {cardList}
      </ScrollView>
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
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 40,
    textAlign: "center",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  card: {
    width: "40%",
    borderWidth: 5,
    borderRadius: 15,
    borderColor: "#FFD440",
    backgroundColor: "white",
    padding: 0,
  },
  cardImage: {
    padding: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardText: {
    margin: 10,
  },
  button: {
    alignItems: "center",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    onPeopleClick: function (id) {
      dispatch({ type: "seeProfile", id });
    },
  };
}

export default connect(null, mapDispatchToProps)(PeopleScreen);
