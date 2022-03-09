import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { Image } from "react-native-elements";
import { connect } from "react-redux";
import DigiButton from "../utils/Button";
import { Ionicons } from "@expo/vector-icons";
import getAge from "../utils/age";

function PeopleProfileScreen(props) {
  const [people, setPeople] = useState({});
  // console.log("people", people);

  const id = props.id;
  // console.log("id", id);
  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(
        `https://digitribebackend.herokuapp.com/profiles/users/${id}`
      );
      var responsePeople = await rawResponse.json();
      setPeople(responsePeople.peopleFind);
    }
    loadData();
  }, []);

  const handlePeopleContact = () => props.navigation.navigate("Chat");

  const interests = people.interests;
  // console.log("interests", interests);
  let icon;
  if (interests) {
    icon = interests.map((interest, index) => {
      return (
        <View key={index} style={styles.iconContainer}>
          <Ionicons
            name={interest.image}
            size={36}
            color="#FFD440"
            style={{ marginRight: "5%" }}
          />
          <Text>{interest.name}</Text>
        </View>
      );
    });
  }

  return (
    <ImageBackground
      source={require("../assets/DigitribeBackground2.png")}
      style={styles.container}
    >
      <View>
        <Image
          source={{
            uri: people.photo,
          }}
          style={{ height: 500 }}
        />
        <Text style={styles.name}>
          {people.firstname}, {getAge(people.birthdate)}
        </Text>
        <Text style={styles.description}>{people.description}</Text>
        <View style={styles.icon}>{icon}</View>
        <View style={styles.button}>
          <DigiButton
            onPress={() => handlePeopleContact()}
            title="Envoyer message"
            icon={
              <Ionicons
                name="chatbubble-ellipses"
                size={24}
                color="white"
                style={{ marginRight: "5%" }}
                buttonStyle={{ selfAlign: "center" }}
              />
            }
          />
        </View>
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
    marginBottom: 40,
    textAlign: "center",
  },
  card: {
    width: "50%",
  },
  name: {
    fontWeight: "700",
    fontSize: 38,
    marginLeft: "5%",
    marginTop: "2%",
    color: "#FFD440",
  },
  description: {
    margin: "5%",
    fontSize: 18,
  },
  icon: {
    flexDirection: "row",
    marginLeft: "5%",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    alignSelf: "center",
    justifyContent: "flex-end",
  },
});

function mapStateToProps(state) {
  // console.log("state", state);
  return { id: state.people };
}

export default connect(mapStateToProps, null)(PeopleProfileScreen);
