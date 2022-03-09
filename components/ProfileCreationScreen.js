import React, { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "../utils/ButtonFinal.js";
import { connect } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import ButtonDrop from "../utils/Button.js";

function ProfileCreationScreen(props) {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loading, setLoading] = useState(false);

  const accountInfos = props.account;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleDescription = (val) => {
    setDescription(val);
  };

  const accountSubmit = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("avatar", {
      uri: image,
      type: "image/jpeg",
      name: "user_avatar.jpg",
    });
    const rawResponse = await fetch(
      "https://digitribebackend.herokuapp.com/signup/avatar",
      {
        method: "post",
        body: data,
      }
    );
    const response = await rawResponse.json();
    console.log("response", response);

    if (response.result === true) {
      const personnalInfo = [];
      personnalInfo.push(`lastname=${accountInfos.lastname}`);
      personnalInfo.push(`firstname=${accountInfos.firstname}`);
      personnalInfo.push(`email=${accountInfos.email}`);
      personnalInfo.push(`password=${accountInfos.password}`);
      personnalInfo.push(`birthdate=${accountInfos.birthdate}`);
      personnalInfo.push(`photo=${response.url}`);
      personnalInfo.push(`description=${description}`);
      personnalInfo.push(`language=${selectedLanguage}`);
      personnalInfo.push(`interestIds=${accountInfos.interestIds}`);
      const pInfo = personnalInfo.join("&");
      // console.log("personnalInfo", pInfo);
      const data = await fetch(
        "https://digitribebackend.herokuapp.com/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: pInfo,
        }
      );
      const body = await data.json();
      if (body.result === true) {
        setLoading(false);
        props.navigation.navigate("BottomNavigator", { screen: "Map" });
        props.onTokenEmit(body.token);
        props.onFirstnameEmit(body.saveUser.firstname);
      } else {
        setLoading(false);
        alert(body.error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../assets/2.png")}
        style={styles.container}
      >
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#8525FF" />
            <Text>Votre profil est en cours de création</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.innerHeader}>Profil</Text>
            </View>
            <View style={styles.avatar}>
              {!image ? (
                <Image
                  source={require("../assets/profile_avatar.png")}
                  style={{ width: 100, height: 100 }}
                />
              ) : (
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100 }}
                />
              )}
              <Button
                title="+ Add Picture"
                titleStyle={{
                  color: "white",
                  fontSize: 20,
                }}
                buttonStyle={styles.button}
                containerStyle={{
                  marginLeft: 20,
                  width: 150,
                }}
                onPress={pickImage}
              />
            </View>
            <TextInput
              multiline
              value={description}
              onChangeText={(val) => handleDescription(val)}
              placeholder="Description"
              style={styles.input}
              maxLength={600}
            />
            <View style={styles.picker}>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
                mode="dropdown"
              >
                <Picker.Item
                  label="Please select your language"
                  value="Unknown"
                />
                <Picker.Item label="Français" value="Français" />
                <Picker.Item label="English" value="English" />
              </Picker>
              <Button
                title="Suivant"
                containerStyle={{
                  width: 300,
                  marginTop: 40,
                }}
                titleStyle={{
                  color: "white",
                  fontSize: 25,
                  fontFamily: "normal",
                }}
                onPress={() => accountSubmit()}
              />
            </View>
          </View>
        )}
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: "15%",
    alignItems: "center",
  },
  avatar: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: "5%",
    justifyContent: "center",
  },
  innerHeader: {
    color: "white",
    fontSize: 35,
    fontWeight: "700",
    marginBottom: 65,
    fontFamily: "Poppins_900Black",
  },
  button: {
    width: "auto",
    marginLeft: "10%",
    backgroundColor: "#8525FF",
  },
  input: {
    height: "20%",
    margin: 12,
    top: 30,
    borderWidth: 1,
    padding: 10,
    width: "85%",
    alignSelf: "center",
  },
  picker: {
    alignSelf: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

function mapStateToProps(state) {
  return { account: state.account };
}

function mapDispatchToProps(dispatch) {
  return {
    onTokenEmit: function (token) {
      dispatch({ type: "addToken", token });
    },
    onFirstnameEmit: function (firstname) {
      dispatch({ type: "saveFirstname", firstname });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileCreationScreen);
