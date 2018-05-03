import TaskCell from './TaskCell';
import TaskService from './taskService';
import Task from './Task';
// import { Button } from 'react-native-material-design';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button
} from 'react-native';

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

  async saveNewTask () {
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
      <View>
        <Task 
          onChangeTitle= {(text) => this.setState({ taskTitle: text }) }
          onChangeDate= {(text) => this.setState({ taskDate: text }) }
          onChangeHour= {(text) => this.setState({ taskHour: text }) }
        />
        
        <View style={styles.alignList}>
          <Text style={styles.activities}>
            Minhas Atividades
          </Text>
          <Button title='botão' onPress = {this.saveNewTask} />
        </View>

        <FlatList style={styles.listTask}
        keyExtractor = { task => task.id }
        data = { this.state.tasks }
        renderItem = {({item}) => <TaskCell task={item}> </TaskCell>}
        />
      </View>
    );
  }
}

function generateId () {
  return Math.random().toString(36).substr(2, 9);
};



const styles = StyleSheet.create({
  activities: {
      marginLeft: 16, 
      marginTop: 40, 
      marginBottom: 20, 
      alignItems: 'center',
      justifyContent: 'center', 
      fontSize: 20, 
      flex: 1
  },
  listTask: {
    flex: 1 
  },
  alignList: {
    flexDirection: 'row'
  }

});
