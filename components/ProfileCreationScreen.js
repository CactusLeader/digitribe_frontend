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
} from "react-native";
import { Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

export default function ImagePickerExample() {
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    marginTop: "12%",
    // alignItems: "center",
  },
  avatar: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginLeft: "10%",
    marginBottom: "8%",
  },
  innerHeader: {
    color: "#8525FF",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 48,
    // alignItems: "center",
  },
  button: {
    width: "auto",
    marginLeft: "10%",
    // justifyContent: "center",
    backgroundColor: "#8525FF",
  },
  input: {
    height: "25%",
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
