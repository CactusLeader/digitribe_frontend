import React, { useState, useEffect } from "react";

import { StyleSheet, View, Text, ScrollView } from "react-native";

import { ListItem, Icon, Avatar, Badge } from "react-native-elements";

import { connect } from "react-redux";

function ContactsScreen(props) {
  const [contactsList, setContactsList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function loadData() {
      const rawResponse = await fetch(
        `https://digitribebackend.herokuapp.com/contact/users/${props.token}`
      );
      const responseContact = await rawResponse.json();

      const tabMessage = [
        ...responseContact.dataMessagesEmit,
        ...responseContact.dataMessagesReceive,
      ];

      let tabFinalMessage = tabMessage.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });

      setContactsList(responseContact.dataUserFilteredFinal);
      setMessagesList(tabFinalMessage);
      setUserId(responseContact.id);
    }
    loadData();
  }, []);

  const handleContact = (id) => {
    props.onContactClick(id);
    props.navigation.navigate("Chat");
  };

  const tablistContacts = contactsList.map((user, index) => {
    let nonLu = 0;
    let message = "";

    for (let i = 0; i < messagesList.length; i++) {
      if (
        (user._id === messagesList[i].userIdEmit &&
          userId === messagesList[i].userIdReception) ||
        (user._id === messagesList[i].userIdReception &&
          userId === messagesList[i].userIdEmit)
      ) {
        message = messagesList[i].text;
        break;
      }
    }

    for (let i = 0; i < messagesList.length; i++) {
      if (
        (user._id === messagesList[i].userIdEmit &&
          userId === messagesList[i].userIdReception &&
          messagesList[i].read === false) ||
        (user._id === messagesList[i].userIdReception &&
          userId === messagesList[i].userIdEmit &&
          messagesList[i].read === false)
      ) {
        nonLu++;
      }
    }

    let valeur = "error";
    if (nonLu === 0) {
      valeur = "success";
    }

    return (
      <ListItem
        key={index}
        containerStyle={{
          marginHorizontal: 16,
          marginVertical: 8,
          borderRadius: 8,
        }}
        onPress={() => handleContact(user._id)}
      >
        <Avatar rounded source={{ uri: user.photo }} />
        <Badge
          status={valeur}
          value={nonLu}
          containerStyle={{ position: "absolute", top: 12, left: 40 }}
        />
        <ListItem.Content>
          <ListItem.Title>{user.firstname}</ListItem.Title>
          <ListItem.Subtitle>{message}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  });

  const tablistNewContacts = contactsList.map((user, i) => {
    return (
      <View style={{ marginHorizontal: 5 }}>
        <Avatar
          key={i}
          size="medium"
          rounded
          source={{ uri: user.photo }}
          onPress={() => handleContact(user._id)}
        />
      </View>
    );
  });

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#E5E5E5",
          height: 100,
          paddingTop: 50,
          paddingLeft: 10,
          // padding: 20
        }}
      >
        <Text style={{ fontSize: 18 }}>Nouveaux Contacts :</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#E5E5E5",
          height: 100,
          paddingLeft: 10,
          borderBottomColor: "#8525FF",
          borderBottomWidth: 2,
        }}
      >
        {tablistNewContacts}
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#E5E5E5",
          height: 100,
          paddingTop: 20,
          paddingLeft: 10,
        }}
      >
        <Text style={{ fontSize: 18 }}>Messages :</Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#E5E5E5",
          marginTop: -40,
        }}
      >
        {tablistContacts}
      </ScrollView>
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onContactClick: function (id) {
      dispatch({ type: "seeProfile", id });
    },
  };
}

function mapStateToProps(state) {
  //   console.log("#3 reception blabla state", state);
  return {
    firstName: state.firstName,
    token: state.token,
    id: state.people,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen);
