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
      <Swipeout
        {...swipeSettings}
        autoClose
        style={styles.swipeout}
      >
        <View style={styles.taskCell}>
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
              onChange={checked => Alert.alert("Ae" + checked)}
            />
          </View>
          <View style={styles.taskCellInfo}>
            <View style={styles.alignCell}>
              <Text style={styles.titlePadding}>
                {this.props.task.title}
              </Text>
            </View>
            <View style={styles.taskAlert}>
              <Icon name="bell-ring" size={17} color="#e3e3e3" marginLeft={2}/>
              <Text style={{ paddingTop: 1, paddingLeft: 3, alignItems: 'center', color:"#e3e3e3"}} >
                {this.props.task.date}
                 <Text> - </Text>
                {this.props.task.hour}
              </Text>
            </View>
          </View>
          {this.state.isEditing &&
            <View>
              <TouchableHighlight onPress={() => this.onCancelEditing()}>
                <Text>Cancelar</Text>
              </TouchableHighlight>
            </View>}
        </View>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  taskCell: {
    flexDirection: "row",
    padding: 9,
    paddingTop: 9,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 1,
    backgroundColor: "white"
  },
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
  },
  titlePadding: {
      padding: 5,
      paddingLeft: 4,
      marginLeft: 9
  }
});
