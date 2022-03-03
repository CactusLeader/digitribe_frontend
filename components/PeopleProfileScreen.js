import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { Card, Icon, Button, Image } from "react-native-elements";
import { connect } from "react-redux";

function PeopleProfileScreen(props) {
  const [people, setPeople] = useState({});

  const id = props.id;
  console.log("id", id);
  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(
        `https://digitribebackend.herokuapp.com/profiles/users/${id}`
      );
      var responsePeople = await rawResponse.json();
      setPeople(responsePeople.peopleFind);
      console.log(people);
    }
    loadData();
  }, []);

  const handlePeopleContact = () => props.navigation.navigate("Chat");

  return (
    <ImageBackground
      source={require("../assets/DigitribeBackground2.png")}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.innerHeader}>Profil de {people.firstname}</Text>
      </View>
      <View>
        <Image
          source={{
            uri: people.photo,
          }}
          style={{ width: 400, height: 400 }}
        />
        <Text>{people.firstname}</Text>
        <Text>{people.description}</Text>
        <Button onPress={() => handlePeopleContact()} title="Envoyer message" />
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
  button: {
    alignItems: "center",
  },
});

function mapStateToProps(state) {
  console.log("state", state);
  return { id: state.people };
}

export default connect(mapStateToProps, null)(PeopleProfileScreen);
