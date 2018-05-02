import TaskService from './taskService';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  CheckBox
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

  async saveNewTask = () => {
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
      <View style={styles.container}>
        <Header 
          onChangeTitle= {(text) => this.setState({ taskTitle: text }) }
          onChangeDate= {(text) => this.setState({ taskDate: text }) }
          onChangeHour= {(text) => this.setState({ taskHour: text }) }
        />
        
        <View style={{ flexDirection: 'row'}}>
          <Text style={{ marginLeft: 16, marginTop: 40, marginBottom: 20, alignItems: 'center', justifyContent: 'center', fontSize: 20, flex: 1 }}>
            Minhas Atividades
          </Text>
          <Button title='botão' onPress = {this.saveNewTask} />
        </View>

        <FlatList style={{ flex: 1 }}
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

class Header extends Component<Props> {
  render() {
    return (
      <View style={{ backgroundColor: 'pink', flexDirection: 'column', alignItems: 'stretch', padding: 10 }}>
          <View>
            <Text> Filho </Text>
            <TextInput onChangeText={(text) => this.props.onChangeTitle(text) } />
          </View>
          <View>
            <Text>Irmão</Text>
            <View style={{ flexDirection: 'row'}}>
                <TextInput onChangeText={(text) => this.props.onChangeDate(text) } />
                <TextInput onChangeText={(text) => this.props.onChangeHour(text) } />
            </View>
          </View>
      </View>
    );
  }
}

class TaskCell extends Component<Props> {
  render() {
    return (
      <View style={{flexDirection: 'row', padding: 2, paddingTop: 8, paddingBottom: 8, borderBottomWidth: StyleSheet.hairlineWidth }}>
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
              <CheckBox style= {{ marginLeft: 10, marginRight: 10 }} />
          </View>
          <View style={{height: 50, flex: 1, alignItems: 'stretch', flexDirection: 'column', justifyContent: 'space-between'}}>
            <View style={{ flex: 1}}>
              <Text>
                {this.props.task.title}
              </Text>      
            </View>
            <View style={{ flexDirection: 'row', flex: 1}}>
            <Text>
              XX
            </Text>
            <Text>
                {this.props.task.date}
                -
                {this.props.task.hour}
            </Text>
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  taskCellItem: {
    height: 40,
  },
  taskCell: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
