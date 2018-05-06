import CustomTextInput from "./customTextInput";

import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  ImageBackground
} from "react-native";

export default class Task extends Component {
  render() {
    return (
      <ImageBackground
        source={require("../images/background_sample.png")}
        style={styles.task}
      >
        <View>
          <Text style={styles.defaultLabel}>Atividade:</Text>
          <CustomTextInput
            value={this.props.titleValue}
            placeholder="ex: Estudar React Native..."
            onChangeText={text => this.props.onChangeTitle(text)}
          />
        </View>
        <View>
          <Text style={styles.defaultLabel}>Me lembrar de fazer em:</Text>
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <CustomTextInput
              value={this.props.dateValue}
              placeholder="ex: 04/05/2018"
              styles={styles.dateAndHour}
              onChangeText={text => this.props.onChangeDate(text)}
            />
            <CustomTextInput
              value={this.props.hourValue}
              placeholder="ex: 20:21"
              styles={styles.dateAndHour}
              onChangeText={text => this.props.onChangeHour(text)}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  defaultLabel: {
    marginTop: 20,
    marginBottom: 5,
    color: "white"
  },
  dateAndHour: {
    marginRight: 10,
    width: 140
  },
  task: {
    flexDirection: "column",
    alignItems: "stretch",
    padding: 20,
    paddingTop: 10,
    paddingBottom: 40
  }
});
