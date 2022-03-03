import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Card, Icon, Button } from "react-native-elements";
import { connect } from "react-redux";

function PeopleScreen(props) {
  const [peopleList, setPeopleList] = useState([]);

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(
        "https://digitribebackend.herokuapp.com/profiles/users"
      );
      var responsePeople = await rawResponse.json();
      setPeopleList(responsePeople.peopleAround);
      console.log(peopleList);
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
      <Card containerStyle={styles.card} key={index}>
        <Card.Image
          style={{ padding: 0 }}
          source={{
            uri: people.photo,
          }}
          // onPress={() => handleProfile()}
        />
        <Card.Divider />
        <Card.Title>{people.firstname}</Card.Title>

        <Text style={{ marginBottom: 10 }}>{people.description}</Text>
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="Voir profil"
          onPress={() => handleProfile(people._id)}
        />
      </Card>
    );
  });

  return (
    <ImageBackground
      source={require("../assets/DigitribeBackground2.png")}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.innerHeader}>Autour de moi...</Text>
      </View>
      <ScrollView>{cardList}</ScrollView>
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

function mapDispatchToProps(dispatch) {
  return {
    onPeopleClick: function (id) {
      dispatch({ type: "seeProfile", id });
    },
  };
}

export default connect(null, mapDispatchToProps)(PeopleScreen);
