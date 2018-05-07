import TaskCell from "./components/TaskCell";
import TaskService from "./taskService";
import Task from "./components/Task";

import { Button } from 'react-native-material-ui';
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Alert,
  CheckBox,
  StatusBar,
  TouchableOpacity,
  Image
} from "react-native";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.taskService = new TaskService();

    this.state = {
      isEditing: false,
      currentEditingCell: null,
      tasks: [],
      taskId: null,
      taskTitle: "",
      taskDate: "",
      taskHour: ""
    };
  }

  onCancelEditing() {
    this.cleanFields();
  }

  onEditingTask(task, cell) {
    if (this.state.currentEditingCell) {
      this.state.currentEditingCell.finishEditing();
    }

    this.setState(previousState => {
      return {
        isEditing: true,
        currentEditingCell: cell,
        taskId: task.id,
        taskTitle: task.title,
        taskDate: task.date,
        taskHour: task.hour
      };
    });
  }

  onFinishTask(task) {
    task.done = true;
    this.deleteTaskOfScreen(task);
    this.taskService.saveTask(task);
  }

  onDeleteTask(task) {
    Alert.alert(
      "Você tem certeza que quer excluir esta atividade?",
      "Esta ação não pode ser revertida",
      [
        { text: "Não", onPress: () => {} },
        {
          text: "Sim",
          onPress: () => {
            this.deleteTaskOfScreen(task);
            this.taskService.deleteTask(task.id);
          }
        }
      ],
      { cancelable: false }
    );
  }

  onSaveTask() {
    let task = this.getTaskFromFields();
    this.taskService.saveTask(task);
    if (this.isAnUpdate(task)) {
      this.updateTaskInScreen(task);
      this.state.currentEditingCell.finishEditing();
    } else {
      this.insertTaskInScreen(task);
    }
    this.cleanFields();
  }

  isAnUpdate(task) {
    return this.state.tasks.some(element => element.id == task.id);
  }

  cleanFields() {
    this.setState(previousState => {
      return {
        isEditing: false,
        currentEditingCell: null,
        taskId: null,
        taskTitle: "",
        taskDate: "",
        taskHour: ""
      };
    });
  }

  updateTaskInScreen(task) {
    this.setState(previousState => {
      let indexOfTask = previousState.tasks.findIndex(
        element => element.id == task.id
      );
      previousState.tasks[indexOfTask] = task;
      return { tasks: [...previousState.tasks] };
    });
  }

  insertTaskInScreen(task) {
    this.setState(previousState => {
      return { tasks: [...previousState.tasks, task] };
    });
  }

  deleteTaskOfScreen(task) {
    this.setState(previousState => {
      var tasks = previousState.tasks.filter(item => {
        return item.id !== task.id;
      });
      return { tasks: tasks };
    });
  }

  getTaskFromFields() {
    return {
      id: this.state.taskId || this.getNewId(),
      title: this.state.taskTitle,
      date: this.state.taskDate,
      hour: this.state.taskHour
    };
  }

  getNewId() {
    return Math.random().toString(36).substr(2, 9);
  }

  async fetchTasks() {
    let tasks = await this.taskService.getAllToDoTasks();
    this.setState(previousState => {
      return { tasks: tasks };
    });
  }

  componentDidMount() {
    this.fetchTasks();
    StatusBar.setHidden(true);
  }

  render() {
    return (
      <View style={styles.container}>
        <Task
          style={{ flex: 1 }}
          titleValue={this.state.taskTitle}
          dateValue={this.state.taskDate}
          hourValue={this.state.taskHour}
          onChangeTitle={text => this.setState({ taskTitle: text })}
          onChangeDate={text => this.setState({ taskDate: text })}
          onChangeHour={text => this.setState({ taskHour: text })}
        />
        <View style={{ height: 0 }}>
          <Button text=''
            icon={this.state.isEditing ? "mode-edit" : "playlist-add"}
            style={{ 
              container: styles.buttonSave, 
              icon: {marginLeft: 8, color: 'white'}
            }}
            onPress={() => this.onSaveTask()}
          />
        </View>
        <Text style={styles.listTaskHeader}> Minhas Atividades </Text>
        <View style={{ flex: 3 }}>
          <FlatList
            style={styles.listTask}
            keyExtractor={task => task.id}
            data={this.state.tasks}
            renderItem={({ item }) =>
              <TaskCell
                task={item}
                onFinishTask={() => this.onFinishTask(item)}
                onEditingTask={cell => this.onEditingTask(item, cell)}
                onDeleteTask={() => this.onDeleteTask(item)}
                onCancelEditing={() => this.onCancelEditing()}
              />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "white"
  },
  listTaskHeader: {
    marginLeft: 16,
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 10
  },
  listTask: {
    flex: 1
  },
  buttonSave: {
    width: 60,
    height: 60,
    borderRadius: 64,
    alignSelf: "flex-end",
    paddingHorizontal: 0,
    backgroundColor: "#e54987",
    bottom: 30,
    right: 20
  }
});