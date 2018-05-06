import React, { Component } from "react";
import { 
    View,
    TextInput,
    StyleSheet
} from "react-native";

export default class CustomTextInput extends Component {
    render() {
      return (
        <View>
          <TextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="#efefef"
            style={[styles.defaultTextInput, this.props.styles]}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChangeText={text => this.props.onChangeText(text)}
          />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
  defaultTextInput: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 6,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 15,
    paddingTop: 15,
    color: "white"
  },

  });