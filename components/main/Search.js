import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";
require("firebase/firestore");

const Search = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);

  const fetchUsers = () => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(data);
          const id = doc.id;
          return { id, ...data };
        });
        console.log("users:", users);
        setUsers(users);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(search)
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={"Search User"}
        onChangeText={(value) => {
          setSearch(value.toLowerCase());
        }}
      />
      <FlatList
        data={filtered}
        horizontal={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={[styles.input, { marginVertical: 5 }]}
              onPress={() => {
                navigation.navigate("Profile", { uid: item.id });
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: { margin: 10 },
  input: {
    padding: 10,
    backgroundColor: "rgba(21,21,21,0.2)",
    borderRadius: 10,
  },
});
