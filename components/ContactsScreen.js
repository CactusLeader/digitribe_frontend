import React, { useState, useEffect } from "react";

import { StyleSheet, View, Text, ScrollView } from "react-native";

import { ListItem, Icon, Avatar } from "react-native-elements";

function ContactsScreen() {
  const [contactsList, setContactsList] = useState([]);

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(
        "https://digitribebackend.herokuapp.com/contact"
      );
      var responseContact = await rawResponse.json();
      setContactsList(responseContact.contact);
      console.log(responseContact);
      console.log("contactsList", contactsList);
    }
    loadData();
  }, []);

  const tablistNewContacts = contactsList.map((user, i) => {
    return (
      <View style={{ marginHorizontal: 5 }}>
        <Avatar key={i} size="medium" rounded source={{ uri: user.photo }} />
      </View>
    );
  });

  const tablistContacts = contactsList.map((user, i) => {
    return (
      <ListItem
        key={i}
        containerStyle={{
          marginHorizontal: 16,
          marginVertical: 8,
          borderRadius: 8,
        }}
      >
        <Avatar rounded source={{ uri: user.photo }} />
        <ListItem.Content>
          <ListItem.Title>{user.firstname}</ListItem.Title>
          <ListItem.Subtitle>{user.description}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ContactsScreen;
