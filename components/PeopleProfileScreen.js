import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Image, Button } from "react-native-elements";
import { connect } from "react-redux";
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
      source={require("../assets/3.png")}
      style={styles.container}
    >
      <Image
        source={{
          uri: people.photo,
        }}
        style={{ height: 500 }}
      />
      <ScrollView>
        <Text style={styles.name}>
          {people.firstname}, {getAge(people.birthdate)}
        </Text>
        <Text style={styles.description}>{people.description}</Text>
        <View style={styles.icon}>{icon}</View>
      </ScrollView>

      <View style={styles.button}>
        <Button
          onPress={() => handlePeopleContact()}
          title="Envoyer message"
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
          icon={
            <Ionicons
              name="chatbubble-ellipses"
              size={24}
              color="white"
              style={{ marginRight: "5%" }}
            />
          }
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
    bottom: Platform.OS === "ios" ? "6%" : "3%",
  },
});

function mapStateToProps(state) {
  // console.log("state", state);
  return { id: state.people };
}

export default connect(mapStateToProps, null)(PeopleProfileScreen);
