import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import StyleSheet from "react-native";

export default class MyDatePicker extends Component {
  
  render() {
    return (
      <DatePicker
        style={{
          width: 130,
          borderWidth: 1,
          marginRight: 10,
          borderColor: "white",
          borderRadius: 5
        }}
        date={this.props.value}
        mode={this.props.mode}
        placeholder= {this.props.placeholder}
        format={this.props.format}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        customStyles={{
          dateText: {
            color: "white",
            fontSize: 18
          },
          dateTouchBody: {
            flex: 1,
            flexBasis: 0,
            height: 0,
          },
          dateInput: {
            borderWidth: 0,
            flex: 1,
            flexBasis: 0,
            paddingLeft: 10,
            paddingRight: 10
          },
          placeholderText: {
            fontSize: 16,
            color: 'white'
          }
        }}
        onDateChange={date => this.props.onChangeValue(date) }
      />
    );
  }
}

