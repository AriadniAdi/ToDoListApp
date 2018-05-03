import React, { Component } from 'react';
import {
    TextInput,
    Text,
    View,
    StyleSheet
} from 'react-native';

export default class Task extends Component<Props> {
    render() {
      return (
        <View style={styles.task}>
            <View>
              <Text> Filho </Text>
              <TextInput onChangeText={(text) => this.props.onChangeTitle(text) } />
            </View>
            <View>
              <Text>Irmão</Text>
              <View style={styles.dateAndHour}>
                  <TextInput onChangeText={(text) => this.props.onChangeDate(text) } />
                  <TextInput onChangeText={(text) => this.props.onChangeHour(text) } />
              </View>
            </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    dateAndHour: { 
        flexDirection: 'row'
    },
    task: {
        backgroundColor: 'pink',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 10 
    }

  });