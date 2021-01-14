import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, Button } from "react-native";
import firebase from "firebase";

require("firebase/firestore");
require("firebase/firebase-storage");

const Save = ({ route }) => {
  const { imageUri } = route.params;
  const [caption, setCaption] = useState("");

  const uploadImage = async () => {
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    const response = await fetch(imageUri);
    const blob = await response.blob();
    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transfered: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((url) => {
        console.log("url: ", url);
      });
    };

    const taskError = (snapshot) => {
      console.log("error: ", snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={{ flex: 1 }} />
      <TextInput
        placeholder={"Give image a caption..."}
        onChangeText={(value) => {
          setCaption(value);
        }}
        value={caption}
      />
      <Button title={"Save"} onPress={uploadImage} />
    </View>
  );
};

export default Save;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
