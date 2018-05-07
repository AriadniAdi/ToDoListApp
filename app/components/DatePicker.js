import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import StyleSheet from "react-native";

export default class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { date: "06-06-2018" };
  }

  render() {
    return (
      <DatePicker
        style={{
          width: 100,
          borderWidth: 1,
          marginRight: 10,
          borderColor: "white",
          borderRadius: 5
        }}
        date={this.state.value}
        mode={this.props.mode}
        placeholder= {this.props.placeholder}
        format="DD/MM/YYYY"
        // minDate="06/05/2018"
        // maxDate="06/10/2018"
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
            paddingBottom: 25,
            paddingTop: 25,
            flex: 1,
            flexBasis: 0,
            height: 0
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

