import React, { Component } from 'react';
import {
    View,
    Text,
    CheckBox,
    StyleSheet
} from 'react-native'

export default class TaskCell extends Component<Props> {
    render() {
      return (
        <View style={styles.taskCell}>
            <View style={styles.checkBoxArea}>
                <CheckBox style={styles.checkBox}/>
            </View>
            <View style={styles.taskCellArea}>
              <View style={styles.alignCell}>
                <Text>
                  {this.props.task.title}
                </Text>      
              </View>
              <View style={styles.taskAlert}>
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
    taskCell: {
        flexDirection: 'row',
        padding: 2, 
        paddingTop: 8, 
        paddingBottom: 8, 
        borderBottomWidth: StyleSheet.hairlineWidth 
    },
    checkBoxArea: {
        justifyContent: 'center',
        alignItems: 'center'
        },
    checkBox: {
        marginLeft: 10,
        marginRight: 10
    },
    taskCellArea: {
        height: 50,
        flex: 1,
        alignItems: 'stretch',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    alignCell: {
        flex: 1
    },
    taskAlert: { 
        flexDirection: 'row', flex: 1
    }

})