import TaskCell from "./components/TaskCell";
import TaskService from "./taskService";
import Task from "./components/Task";

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

  onEditTask(task) {
    this.setState(previousState => {
      return {
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
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => this.onSaveTask()}
          />
        </View>
        <View style={{ backgroundColor: "white", flex: 2 }}>
          <Text style={styles.activities}> Minhas Atividades </Text>
          <FlatList
            style={styles.listTask}
            keyExtractor={task => task.id}
            data={this.state.tasks}
            renderItem={({ item }) =>
              <TaskCell
                task={item}
                onFinishTask={() => this.onFinishTask(item)}
                onEditTask={() => this.onEditTask(item)}
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
    alignItems: "stretch"
  },
  activities: {
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 4,
    fontSize: 20,
    height: 40
  },
  listTask: {
    flex: 1
  },
  buttonArea: {
    width: 60,
    height: 60,
    bottom: 20,
    right: 20,
    flex: 0.1,
    alignSelf: "flex-end"
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 64,
    alignSelf: "flex-end",
    backgroundColor: "#e54987",
    bottom: 20,
    right: 20
  },
  image: {
    alignSelf: "flex-end",
    bottom: 20,
    right: 20
  }
});
