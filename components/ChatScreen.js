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

import socketIOClient from "socket.io-client";

import { connect } from "react-redux";

// Pensez à changer l'adresse ci-dessous avec votre IP locale !
const socket = socketIOClient("https://digitribebackend.herokuapp.com/");

function ChatScreen(props) {
  const [currentMessage, setCurrentMessage] = useState();
  const [listMessage, setListMessage] = useState([]);
  const [sendByUser, setSendByUser] = useState(false);

  useEffect(() => {
    setSendByUser(false);
    socket.on("sendMessageToAll", (newMessageData) => {
      setListMessage([...listMessage, newMessageData]);
    });
  }, [listMessage]);

  const MessageSubmit = async () => {
    setSendByUser(true);
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
    //   <View
    //     style={{
    //       flex: 1,
    //       alignItems: "flex-end",
    //       width: "70%",
    //       backgroundColor: "red",
    //     }}
    //   >
    //     <Text>{msg}</Text>
    //   </View>
    // );
    if (sendByUser === true) {
      return (
        <View
          key={i}
          style={{
            marginHorizontal: 8,
            marginVertical: 8,
            borderRadius: 8,
            justifyContent: "flex-end",
            // borderColor: "black",
            // borderWidth: 1,
            alignSelf: "flex-end",
            width: "auto",
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: "#7D4FF4",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>{msg}</Text>
          <Text style={{ color: "white", alignSelf: "flex-end" }}>
            {messageData.firstName}
          </Text>
        </View>
      );
    } else {
      return (
        <View
          key={i}
          style={{
            marginHorizontal: 8,
            marginVertical: 8,
            borderRadius: 8,
            justifyContent: "flex-end",
            // borderColor: "black",
            // borderWidth: 1,
            alignSelf: "flex-end",
            width: "auto",
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: "#FFD440",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>{msg}</Text>
          <Text style={{ color: "white", alignSelf: "flex-end" }}>
            {messageData.firstName}
          </Text>
        </View>
      );
    }
  });

  const firstName = props.firstName;

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
          // padding: 20
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
        <Text style={{ fontSize: 25 }}>Monsieur Test</Text>
        <Image
          source={require("../assets/profile_avatar.png")}
          style={{ width: 35, height: 35, borderRadius: 50, marginRight: 10 }}
        />
      </View>

      <ScrollView style={{ flex: 1 }}>{listMessageItem}</ScrollView>

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
