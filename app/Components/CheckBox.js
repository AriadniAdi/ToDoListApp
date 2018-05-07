import Icon from "react-native-vector-icons/Feather";

import React, { Component } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = this.getStateFor(props.checked);
  }

  onChange() {
    this.setState(previousState => {
      return this.getStateFor(!previousState.checked);
    });
  }

  getStateFor(checked) {
    let borderColor = checked
      ? this.props.borderColorChecked
      : this.props.borderColorUnChecked;
    let backgroundColor = checked
      ? this.props.backgroundColorChecked
      : this.props.backgroundColorUnChecked;
    return {
      borderColor: borderColor,
      backgroundColor: backgroundColor,
      checked: checked
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.onChange();
          this.props.onChange(!this.state.checked);
        }}
      >
        <View
          style={{
            backgroundColor: this.state.backgroundColor,
            borderWidth: this.props.borderWidth,
            borderColor: this.state.borderColor,
            height: this.props.size,
            width: this.props.size,
            borderRadius: 10
          }}
        >
          {this.state.checked &&
            <Icon
              style={{ textAlign: "center" }}
              size={this.props.size - this.props.borderWidth * 2}
              name="check"
              color={this.props.color}
            />}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
