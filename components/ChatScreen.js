import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import { Button, ListItem, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";

import socketIOClient from "socket.io-client";

import { connect } from "react-redux";

const socket = socketIOClient("https://digitribebackend.herokuapp.com/");

function ChatScreen(props) {
  const [currentMessage, setCurrentMessage] = useState();
  const [listMessage, setListMessage] = useState([]);
  const [nameUser, setNameUser] = useState("");
  const [urlUser, setUrlUser] = useState("");
  const [listMessageFromBack, setListMessageFromBack] = useState([]);
  const [dataUserId, setDataUserId] = useState("");

  const onMessagesToAll = (newMessageData) => {
    // console.log("newMessageData", newMessageData);
    // console.log("prenom de l utilisateur", props.firstName);
    setListMessage([...listMessage, newMessageData]);
  };

  useEffect(() => {
    socket.on("sendMessageToAll", onMessagesToAll);
  }, [listMessage]);

  useEffect(() => {
    async function loadData() {
      // console.log("#iqhsbfjkhbjvhbjhdcbvjhbfdhjqvbjhdfbjvbjhdfbjhvbdfjbvhj");
      const rawResponse = await fetch(
        `https://digitribebackend.herokuapp.com/messages/users/${props.token}/recipients/${props.id}`
      );
      const responseMessage = await rawResponse.json();

      // console.log("responseMessage", responseMessage);

      const tabMessage = [
        ...responseMessage.dataMessagesEmit,
        ...responseMessage.dataMessagesReception,
      ];

      let tabFinalMessage = tabMessage.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });

      setNameUser(responseMessage.dataRecipient.firstname);
      setUrlUser(responseMessage.dataRecipient.photo);
      setListMessageFromBack(tabFinalMessage);
      setDataUserId(responseMessage.id);
    }
    loadData();
  }, []);

  const firstName = props.firstName;

  const MessageSubmit = async () => {
    socket.emit("sendMessage", {
      message: currentMessage,
      firstName: firstName,
      tokenSocket: props.token,
    });
    socket.off("sendMessageToAll", onMessagesToAll);

    setCurrentMessage("");

    const date = new Date();

    const data = await fetch(
      `https://digitribebackend.herokuapp.com/messages/users/${props.token}/recipients/${props.id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `message=${currentMessage}&date=${date}`,
      }
    );
    const body = await data.json();

    // console.log("body", body);
  };

  const baseStyleMessage = {
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    width: "auto",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#FFD440",
  };

  const emitStyleMessage = {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    backgroundColor: "#7D4FF4",
  };

  const ReceivStyleMessage = {
    alignSelf: "flex-start",
    backgroundColor: "#FFD440",
  };

  let iconName = "checkmark-outline";
  let colorIcon = "black";

  const listMessageItemBack = listMessageFromBack.map((messageData, i) => {
    let msg = messageData.text.replace(/:\)/g, "\u263A");
    msg = msg.replace(/:\(/g, "\u2639");
    msg = msg.replace(/:p/g, "\uD83D\uDE1B");

    msg = msg.replace(/[a-z]*fuck[a-z]*/gi, "\u2022\u2022\u2022");

    let styleMessage = {};
    let name = "";
    if (dataUserId === messageData.userIdEmit) {
      styleMessage = { ...baseStyleMessage, ...emitStyleMessage };
      name = props.firstName;
    } else {
      styleMessage = { ...baseStyleMessage, ...ReceivStyleMessage };
      name = nameUser;
    }

    if (messageData.read === true) {
      iconName = "checkmark-done-outline";
      colorIcon = "green";
    }

    return (
      <View key={i} style={styleMessage}>
        <Text style={{ color: "white", fontSize: 18 }}>{msg}</Text>
        <Text style={{ color: "white", alignSelf: "flex-end" }}>
          {name}
          <Ionicons name={iconName} size={15} color={colorIcon} />
        </Text>
      </View>
    );
  });

  const listMessageItem = listMessage.map((messageData, i) => {
    let msg = messageData.message.replace(/:\)/g, "\u263A");
    msg = msg.replace(/:\(/g, "\u2639");
    msg = msg.replace(/:p/g, "\uD83D\uDE1B");

    msg = msg.replace(/[a-z]*fuck[a-z]*/gi, "\u2022\u2022\u2022");

    let styleMessage = {};
    let name = "";
    if (messageData.tokenSocket === props.token) {
      styleMessage = { ...baseStyleMessage, ...emitStyleMessage };
      name = props.firstName;
    } else {
      styleMessage = { ...baseStyleMessage, ...ReceivStyleMessage };
      name = nameUser;
    }

    //BRAVO ELO, C'EST TA FAUTE

    return (
      <View key={i} style={styleMessage}>
        <Text style={{ color: "white", fontSize: 18 }}>{msg}</Text>
        <Text style={{ color: "white", alignSelf: "flex-end" }}>{name}</Text>
      </View>
    );
  });

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#E5E5E5",
          justifyContent: "space-between",
          height: 100,
          paddingTop: 50,
          paddingLeft: 10,
        }}
      >
        <Button
          icon={<Icon name="arrow-left" size={20} color="black" />}
          buttonStyle={{
            backgroundColor: "#E5E5E5",
            borderRadius: 100,
            width: 35,
            height: 35,
          }}
          type="solid"
          onPress={() => props.navigation.navigate("Map")}
        />
        <Text style={{ fontSize: 25 }}>{nameUser}</Text>
        <Image
          source={{
            uri: urlUser,
          }}
          style={{ width: 35, height: 35, borderRadius: 50, marginRight: 10 }}
        />
      </View>

      <ScrollView style={{ flex: 1 }}>
        {listMessageItemBack}
        {listMessageItem}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#E5E5E5",
            borderRadius: 20,
            justifyContent: "space-evenly",
          }}
        >
          <Input
            containerStyle={{ width: "85%", marginBottom: -16 }}
            inputStyle={{ marginLeft: 10 }}
            placeholder="Ton message"
            onChangeText={(msg) => setCurrentMessage(msg)}
            value={currentMessage}
          />
          <Button
            icon={<Icon name="envelope-o" size={20} color="#ffffff" />}
            buttonStyle={{
              backgroundColor: "#7D4FF4",
              borderRadius: 100,
              width: 50,
              height: 50,
            }}
            type="solid"
            onPress={() => MessageSubmit()}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

function mapStateToProps(state) {
  //   console.log("#3 reception blabla state", state);
  return {
    firstName: state.firstName,
    token: state.token,
    id: state.people,
  };
}

export default connect(mapStateToProps, null)(ChatScreen);
