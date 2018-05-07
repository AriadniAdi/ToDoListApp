import CustomTextInput from "./customTextInput";
import DatePicker from "./DatePicker";

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
  constructor(props) {
    super(props);
    this.state = { date: "" };
  }

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
          <View style={{ flexDirection: "row", marginBottom: 20, height: 50}}>
            <DatePicker 
              mode="datetime"
              placeholder="06/05/2018"
              value={this.props.dateValue}
              onChangeValue={date => this.props.onChangeDate(date)} />

              <DatePicker 
              mode="time"
              placeholder="15:30"
              value={this.props.hourValue}
              styles={styles.dateAndHour}
              onChangeValue={hour => this.props.onChangeHour(hour)}
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
