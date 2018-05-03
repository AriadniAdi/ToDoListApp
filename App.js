import TaskCell from './TaskCell';
import TaskService from './taskService';
import Task from './Task';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button
} from 'react-native';

import { ActionButton } from 'react-native-material-ui';

const uiTheme = {
  palette: {
      primaryColor: COLOR.green500,
  },
  toolbar: {
      container: {
          height: 50,
      },
  },
};

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.taskService = new TaskService()

    this.state = { 
      tasks: [],
      taskId: null,
      taskTitle: '',
      taskDate: '',
      taskHour: ''
     }
  }

  async fetchTasks() {
    let tasks = await this.taskService.getAllTasks();
    this.setState(previousState => {
      return { tasks: tasks };
    });
  }

  async saveNewTask() {
    let newTask = this.getTask()
    newTask.id = generateId()
    
    await this.taskService.insertTask(newTask);
    this.updateTasksList(newTask)
  }

  updateTasksList(task) {
    this.setState(previousState => {
      previousState.tasks.push(task)
      return { tasks: previousState.tasks };
    });
  }

  getTask() {
    return {
      id: this.state.taskId,
      title: this.state.taskTitle,
      date: this.state.taskDate,
      hour: this.state.taskHour,
    }
  }

  componentDidMount() {
    this.fetchTasks()
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <Task 
            onChangeTitle= {(text) => this.setState({ taskTitle: text }) }
            onChangeDate= {(text) => this.setState({ taskDate: text }) }
            onChangeHour= {(text) => this.setState({ taskHour: text }) }
          />
          <View style={{width: 60, height: 60, position: 'absolute', top: 150, right: 20}} > 
            <Button title='ds' onPress= { this.saveNewTask.bind(this)}/>
          </View>

          <Text style={styles.activities}> Minhas Atividades </Text>
          <FlatList style={styles.listTask}
          keyExtractor = { task => task.id }
          data = { this.state.tasks }
          renderItem = {({item}) => <TaskCell task={item}> </TaskCell>}
          />
        </View>
      </ThemeProvider>
    )
  }
}

function generateId () {
  return Math.random().toString(36).substr(2, 9);
};



const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    alignItems: 'stretch'
  },
  activities: {
      marginLeft: 16, 
      marginTop: 40,
      marginBottom: 4, 
      alignItems: 'center',
      justifyContent: 'center', 
      fontSize: 20, 
      flex: 0.1
  },
  listTask: {
    flex: 1
  }
});
