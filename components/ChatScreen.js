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

import * as Animatable from "react-native-animatable";
// MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);

const socket = socketIOClient("http://192.168.148.169:3000/");

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
        `http://192.168.148.169:3000/messages/users/${props.token}/recipients/${props.id}`
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

  useEffect(() => {
    async function loadData2() {
      const rawResponse2 = await fetch(
        `http://192.168.148.169:3000/messages/users/${props.token}/recipients/${props.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      const response2 = await rawResponse2.json();
    }
    loadData2();
  }, [listMessage]);

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
      `http://192.168.148.169:3000/messages/users/${props.token}/recipients/${props.id}`,
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

  const listMessageItemBack = listMessageFromBack.map((messageData, i) => {
    let msg = messageData.text.replace(/:\)/g, "\u263A");
    msg = msg.replace(/:\(/g, "\u2639");
    msg = msg.replace(/:p/g, "\uD83D\uDE1B");

    msg = msg.replace(/[a-z]*fuck[a-z]*/gi, "\u2022\u2022\u2022");

    let styleMessage = {};
    let name = "";
    let messageIcon = "";
    if (dataUserId === messageData.userIdEmit) {
      styleMessage = { ...baseStyleMessage, ...emitStyleMessage };
      name = props.firstName;
      if (messageData.read === true) {
        messageIcon = (
          <Ionicons name="checkmark-done-outline" size={15} color="green" />
        );
      } else {
        messageIcon = (
          <Ionicons name="checkmark-outline" size={15} color="black" />
        );
      }
    } else {
      styleMessage = { ...baseStyleMessage, ...ReceivStyleMessage };
      name = nameUser;
    }

    return (
      <View key={i} style={styleMessage}>
        <Text style={{ color: "white", fontSize: 18 }}>{msg}</Text>
        <Text style={{ color: "white", alignSelf: "flex-end" }}>
          {name}
          {messageIcon}
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
    let messageIcon = "";
    if (messageData.tokenSocket === props.token) {
      styleMessage = { ...baseStyleMessage, ...emitStyleMessage };
      name = props.firstName;
      if (messageData.read === true) {
        messageIcon = (
          <Ionicons name="checkmark-done-outline" size={15} color="green" />
        );
      } else {
        messageIcon = (
          <Ionicons name="checkmark-outline" size={15} color="black" />
        );
      }
    } else {
      styleMessage = { ...baseStyleMessage, ...ReceivStyleMessage };
      name = nameUser;
    }

    if (messageData.read === true) {
      iconName = "checkmark-done-outline";
      colorIcon = "green";
    }

    return (
      <Animatable.View
        animation="lightSpeedIn"
        key={i}
        style={styleMessage}
        // iterationCount=1
      >
        {/* <View key={i} style={styleMessage}> */}
        <Text style={{ color: "white", fontSize: 18 }}>{msg}</Text>
        <Text style={{ color: "white", alignSelf: "flex-end" }}>
          {name}
          {messageIcon}
        </Text>
        {/* // </View> */}
      </Animatable.View>
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
          onPress={() =>
            props.navigation.navigate("BottomNavigator", { screen: "Contacts" })
          }
        />
        <Text style={{ fontSize: 25 }}>{nameUser}</Text>
        <Image
          source={{
            uri: urlUser ? urlUser : "../assets/profile_avatar.png",
          }}
          style={{ width: 35, height: 35, borderRadius: 50, marginRight: 10 }}
        />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        ref={(ref) => {
          this.scrollView = ref;
        }}
        onContentSizeChange={() =>
          this.scrollView.scrollToEnd({ animated: true })
        }
      >
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
