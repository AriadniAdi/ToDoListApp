import Swipeout from "react-native-swipeout";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CheckBox from "./CheckBox";

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableHighlight
} from "react-native";

export default class TaskCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  onCancelEditing() {
    this.finishEditing();
    this.props.onCancelEditing();
  }

  onStartEditing() {
    this.setState(previousState => {
      return { isEditing: true };
    });
    this.props.onEditingTask(this);
  }

  finishEditing() {
    this.setState(previousState => {
      return { isEditing: false };
    });
  }

  getTitleCapitalized() {
    let title = this.props.task.title;
    if (title != null && title.length >= 1) {
      return title.charAt(0).toUpperCase() + title.slice(1);
    }
    return null;
  }

  getTaskCellStyle() {
    return StyleSheet.flatten({
      flexDirection: "row",
      padding: 9,
      paddingTop: 9,
      paddingBottom: 8,
      borderBottomWidth: this.state.isEditing? 2 : StyleSheet.hairlineWidth,
      flex: 1,
      backgroundColor: "white",
      borderRadius: this.state.isEditing? 5 : 0,
      borderWidth: this.state.isEditing? 2 : 2,
      borderColor: this.state.isEditing? '#e54987': 'white'
    });
  }

  getTitleStyle() {
    return StyleSheet.flatten({
        padding: 5,
        paddingLeft: 4,
        marginLeft: 9,
        color: this.state.isEditing? '#e54987': 'black',
        fontWeight: this.state.isEditing? '800' : 'normal'
    });
  }

  getDateAndHourStyle() {
    return StyleSheet.flatten({
      paddingTop: 1,
      paddingLeft: 3,
      alignItems: "center",
      color: this.state.isEditing? '#e54987':"#e3e3e3",
      fontWeight: this.state.isEditing? '800' : 'normal'
    });
  }

  render() {
    let swipeBtns = [
      {
        text: "Editar",
        backgroundColor: "#6056a0",
        underlayColor: "rgba(0, 0, 0, 1, 0.6)",
        onPress: () => this.onStartEditing()
      },
      {
        text: "Excluir",
        backgroundColor: "#e54987",
        underlayColor: "rgba(0, 0, 0, 1, 0.6)",
        onPress: () => this.props.onDeleteTask()
      }
    ];

    let swipeSettings = {
      autoClose: true,
      right: swipeBtns,
      rowId: this.props.task.id,
      sectionId: 1
    };

    return (
      <Swipeout {...swipeSettings} style={styles.swipeout}>
        <View style={this.getTaskCellStyle()}>
          <View style={styles.checkBoxArea}>
            <CheckBox
              checked={false}
              size={35}
              borderWidth={2}
              borderColorChecked="white"
              backgroundColorChecked="#e54987"
              borderColorUnChecked="#6056a0"
              backgroundColorUnChecked="white"
              color="white"
              onChange={checked => {
                if (checked) {
                  this.props.onDoneTask();
                }
              }}
            />
          </View>
          <View style={styles.taskCellInfo}>
            <View style={styles.alignCell}>
              <Text style={this.getTitleStyle()}>
                {this.getTitleCapitalized()}
              </Text>
            </View>
            <View style={styles.taskAlert}>
              <Icon name="bell-ring" size={17} color={this.state.isEditing? "#e54987" : "#e3e3e3"} marginLeft={2} />
              <Text
                style={this.getDateAndHourStyle()}
              >
                {this.props.task.date}
                <Text style={this.getDateAndHourStyle()}> - </Text>
                {this.props.task.hour}
              </Text>
            </View>
          </View>
          {this.state.isEditing &&
            <View>
              <TouchableHighlight style={{ alignItems: 'stretch',justifyContent: 'center', flex: 1 }}onPress={() => this.onCancelEditing()}>
                <Text style={{ color: '#6056a0',fontWeight: 'bold'}}>CANCELAR</Text>
              </TouchableHighlight>
            </View>}
        </View>
        <View style={{ backgroundColor: '#e3e3e3', height: StyleSheet.hairlineWidth}} />
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  checkBoxArea: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  taskCellInfo: {
    height: 50,
    flex: 1,
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  alignCell: {
    flex: 1
  },
  taskAlert: {
    flexDirection: "row",
    flex: 1,
    padding: 5,
    paddingLeft: 10
  },
  swipeout: {
    paddingLeft: 24,
    backgroundColor: "white",
    paddingRight: 24
  }
});
