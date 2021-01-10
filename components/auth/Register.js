import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }

  onSignUp = () => {};

  render() {
    return (
      <View>
        <TextInput
          placeholder="name"
          onChangeText={(name) => {
            this.setState({ password });
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
