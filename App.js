/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { 
      tasks: [],
      taskTitle: '',
      taskDate: '',
      taskHour: ''
     }
  }

  // TODO: PEGAR DADOS DO BANCO DE DADOS
  fetchTasks() {
    for(var i = 0; i < 20 ; i++) {
      this.insertTask({ id: generateId(), title: 'título', date: '17/11/2018', hour: '16:00'})
    }
  }

  saveTask = () => {
    let task = {
      id: generateId(),
      title: this.state.taskTitle,
      date: this.state.taskDate,
      hour: this.state.taskHour,
    }
    this.insertTask(task)
  }

  insertTask(task) {
    this.setState(previousState => {
      previousState.tasks.push(task)
      return { tasks: previousState.tasks };
    });
  }

  componentDidMount() {
    this.fetchTasks()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: 'pink', flexDirection: 'column', alignItems: 'stretch', padding: 10 }}>
          <View>
            <Text> Filho </Text>
            <TextInput onChangeText={(text) => this.setState({ taskTitle: text })} />
          </View>
          <View>
            <Text>Irmão</Text>
            <View style={{ flexDirection: 'row'}}>
                <TextInput onChangeText={(text) => this.setState({ taskDate: text })} />
                <TextInput onChangeText={(text) => this.setState({ taskHour: text })} />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row'}}>
          <Text style={{ marginLeft: 16, marginTop: 40, marginBottom: 20, alignItems: 'center', justifyContent: 'center', fontSize: 20, flex: 1 }}>
            Minhas Atividades
          </Text>
          <Button title='botão' onPress = {this.saveTask} />
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
