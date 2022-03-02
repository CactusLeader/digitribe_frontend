import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import ButtonDrop from "../utils/Button.js";

function ProfileCreationScreen(props) {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleDescription = (val) => {
    setDescription(val);
  };

  const accountSubmit = () => {
    props.navigation.navigate("Map");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../assets/DigitribeBackground2.png")}
        style={styles.container}
      >
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
            buttonStyle={styles.button}
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
            //   style={styles.picker}
          >
            <Picker.Item label="Please select your language" value="Unknown" />
            <Picker.Item label="Français" value="Français" />
            <Picker.Item label="English" value="English" />
          </Picker>
        </View>
        <ButtonDrop title="Suivant" onPress={() => accountSubmit()} />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    marginTop: "15%",
    // alignItems: "center",
  },
  avatar: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginLeft: "10%",
    marginBottom: "5%",
  },
  innerHeader: {
    color: "#8525FF",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 65,
    // alignItems: "center",
  },
  button: {
    width: "auto",
    marginLeft: "10%",
    // justifyContent: "center",
    backgroundColor: "#8525FF",
  },
  input: {
    height: "20%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "85%",
  },
  text: {
    marginTop: "5%",
    marginLeft: "10%",
    fontSize: 16,
  },
  picker: {
    width: "85%",
    justifyContent: "center",
    // alignItems: "center",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    onPersonnalInfoClick: function () {
      dispatch({ type: "personnalInfo" });
    },
  };
}

export default connect(null, mapDispatchToProps)(ProfileCreationScreen);
