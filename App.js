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
  getTasks() {
    let items = []
    for(var i = 0; i < 20 ; i++) {
      items.push({ id: '1', title: 'título', date: '17/11/2018', hour: '16:00', done: false })
    }
    return items
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={{ flex: 1 }}
        keyExtractor = { item => item.id }
        data = {this.getTasks()}
        renderItem = {({item}) => <TaskCell task={item}> </TaskCell>}
        />
      </View>
    );
  }
}

class TaskCell extends Component<Props> {
  render() {
    return (
      <View style={{flexDirection: 'row', padding: 2, borderBottomWidth: StyleSheet.hairlineWidth }}>
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
              <CheckBox style= {{ marginLeft: 10, marginRight: 10 }} />
          </View>
          <View style={{height: 50, flex: 1, alignItems: 'stretch', flexDirection: 'column', justifyContent: 'space-between'}}>
            <View style={{ flex: 1}}>
              <Text>
                {this.props.task.title}
              </Text>      
            </View>
            <View style={{ flex: 1}}>
            <Text>
                {this.props.task.date}
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
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
