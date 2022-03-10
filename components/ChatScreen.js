import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Text,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Button, Input } from "react-native-elements";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

function ChatScreen(props) {
  const [currentMessage, setCurrentMessage] = useState();
  const [listMessage, setListMessage] = useState([]);

  const [nameUser, setNameUser] = useState("");
  const [urlUser, setUrlUser] = useState("");
  const [listMessageFromBack, setListMessageFromBack] = useState([]);
  const [dataUserId, setDataUserId] = useState("");

  const socketRef = useRef(null);

  const sendMessage = (newMessageData) => {
    setListMessage([...listMessage, newMessageData]);
    if (socketRef) {
      socketRef.current.off("sendMessageToAll", sendMessage);
    }
  };

  useEffect(() => {
    // console.log("Création");
    socketRef.current = socketIOClient(
      "https://digitribebackend.herokuapp.com/"
    );
    return () => {
      // console.log("destruction");
      if (socketRef) {
        socketRef.current.off("sendMessageToAll", sendMessage);
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socketRef) {
      socketRef.current.on("sendMessageToAll", sendMessage);
    }
  }, [listMessage]);

  const firstName = props.firstName;

  const messageSubmit = async () => {
    if (socketRef) {
      socketRef.current.emit("sendMessage", {
        message: currentMessage,
        firstName: firstName,
        tokenSocket: props.token,
      });
    }
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

  useEffect(() => {
    async function loadData() {
      // console.log("loadData1");

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

  useEffect(() => {
    async function loadData2() {
      // console.log("loadData2");
      const rawResponse2 = await fetch(
        `https://digitribebackend.herokuapp.com/messages/users/${props.token}/recipients/${props.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      const response2 = await rawResponse2.json();
    }
    loadData2();
  }, [listMessage]);

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
    let name = null;
    let messageIcon = "";
    let separation = ":";
    if (dataUserId === messageData.userIdEmit) {
      styleMessage = { ...baseStyleMessage, ...emitStyleMessage };
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
      name = (
        <Text style={{ color: "grey", fontSize: 16, fontWeight: "bold" }}>
          {nameUser}
        </Text>
      );
    }

    const date = new Date(messageData.date);
    const hour = date.getHours() - 1;
    const minute = date.getUTCMinutes();
    if (minute < 10) {
      separation = ":0";
    }

    return (
      <View key={i} style={styleMessage}>
        {name}
        <Text style={{ color: "white", fontSize: 18 }}>{msg}</Text>
        <Text style={{ color: "white", alignSelf: "flex-end", fontSize: 12 }}>
          {hour}
          {separation}
          {minute}
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

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getUTCMinutes();
    let separation = ":";

    let styleMessage = {};
    let name = null;
    let messageIcon = "";
    let animationType = "";
    if (messageData.tokenSocket === props.token) {
      styleMessage = { ...baseStyleMessage, ...emitStyleMessage };
      animationType = "slideInRight";
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
      name = (
        <Text style={{ color: "grey", fontSize: 16, fontWeight: "bold" }}>
          {nameUser}
        </Text>
      );
      animationType = "slideInLeft";
    }

    if (messageData.read === true) {
      iconName = "checkmark-done-outline";
      colorIcon = "green";
    }

    if (minute < 10) {
      separation = ":0";
    }

    if (i === listMessage.length - 1) {
      return (
        <Animatable.View animation={animationType} key={i} style={styleMessage}>
          {name}
          <Text style={{ color: "white", fontSize: 18 }}>{msg}</Text>
          <Text style={{ color: "white", alignSelf: "flex-end", fontSize: 12 }}>
            {hour}
            {separation}
            {minute}
            {messageIcon}
          </Text>
        </Animatable.View>
      );
    } else {
      return (
        <View key={i} style={styleMessage}>
          <Text style={{ color: "white", fontSize: 18 }}>{msg}</Text>
          <Text style={{ color: "white", alignSelf: "flex-end", fontSize: 12 }}>
            {name}
            {hour}
            {separation}
            {minute}
            {messageIcon}
          </Text>
        </View>
      );
    }
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
            onPress={() => messageSubmit()}
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
