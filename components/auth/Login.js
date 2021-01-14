import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onSignIn = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
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
        <Button title={"Login"} onPress={() => this.onSignIn()} />
      </View>
    );
  }
}
