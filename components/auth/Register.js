import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import firebase from "firebase";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }

  onSignUp = () => {
    const { email, password, name } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <View>
        <TextInput
          placeholder="name"
          onChangeText={(name) => {
            this.setState({ name });
          }}
        />
        <TextInput
          placeholder="email"
          onChangeText={(email) => {
            this.setState({ email });
          }}
        />
        <TextInput
          secureTextEntry
          placeholder="password"
          onChangeText={(password) => {
            this.setState({ password });
          }}
        />
        <Button title={"Register"} onPress={() => this.onSignUp()} />
      </View>
    );
  }
}
