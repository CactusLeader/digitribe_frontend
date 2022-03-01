import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  ImageBackground,
  Text,
} from "react-native";
import { Button, ListItem, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import socketIOClient from "socket.io-client";

import { connect } from "react-redux";

// Pensez à changer l'adresse ci-dessous avec votre IP locale !
const socket = socketIOClient("https://digitribebackend.herokuapp.com/");

function ChatScreen(props) {
  const [currentMessage, setCurrentMessage] = useState();
  const [listMessage, setListMessage] = useState([]);

  useEffect(() => {
    socket.on("sendMessageToAll", (newMessageData) => {
      setListMessage([...listMessage, newMessageData]);
    });
  }, [listMessage]);

  const MessageSubmit = async () => {
    socket.emit("sendMessage", {
      message: currentMessage,
      firstName: firstName,
    });

    setCurrentMessage("");

    const date = new Date().getDate();

    const data = await fetch(
      "https://digitribebackend.herokuapp.com/messages",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `message=${currentMessage}&date=${date}&tokenUser=${props.token}`,
        //&recipientId=${}
      }
    );
    const body = await data.json();

    // console.log("body", body);
  };

  const listMessageItem = listMessage.map((messageData, i) => {
    let msg = messageData.message.replace(/:\)/g, "\u263A");
    msg = msg.replace(/:\(/g, "\u2639");
    msg = msg.replace(/:p/g, "\uD83D\uDE1B");

    msg = msg.replace(/[a-z]*fuck[a-z]*/gi, "\u2022\u2022\u2022");

    return (
      <ListItem key={i}>
        <ListItem.Content>
          <ListItem.Title>{msg}</ListItem.Title>
          <ListItem.Subtitle>{messageData.firstName}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  });

  const firstName = props.firstName;

  return (
    <ImageBackground
      source={require("../assets/home.jpg")}
      style={styles.container}
    >
      <ScrollView style={{ flex: 1, marginTop: 50 }}>
        {listMessageItem}
      </ScrollView>

      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      > */}
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          color: "#7D4FF4",
          marginBottom: 30,
          marginTop: -1000,
        }}
      >
        Chat
      </Text>
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Ton message"
        onChangeText={(msg) => setCurrentMessage(msg)}
        value={currentMessage}
      />
      <Button
        icon={<Icon name="envelope-o" size={20} color="#ffffff" />}
        title="Send"
        buttonStyle={{ backgroundColor: "#eb4d4b" }}
        type="solid"
        onPress={() => MessageSubmit()}
      />
      {/* </KeyboardAvoidingView> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

function mapStateToProps(state) {
  //   console.log("#3 reception blabla state", state);
  return {
    firstName: state.firstName,
    token: state.token,
  };
}

export default connect(mapStateToProps, null)(ChatScreen);
