import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/Feather';
import CheckBox from './CheckBox';
// import { Bell } from 'mdi-material-ui';

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Alert
} from 'react-native'

export default class TaskCell extends Component {

    render() {
        let swipeBtns = [
            {
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { 
                    {this.props.onDeleteTask()}
                }
            },
            {
                text: 'Edit',
                backgroundColor: 'green',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { 
                    {this.props.onEditTask()}
                }
            },
        ];

        let swipeSettings = {
            autoClose: true,
            right: swipeBtns,
            rowId: this.props.task.id,
            sectionId: 1
        }
      
      return (
        <Swipeout {...swipeSettings} >
            <View style={styles.taskCell}>
                <View style={styles.checkBoxArea}>
                    <CheckBox 
                        checked={true}
                        size={50}
                        borderWidth={5}
                        
                        borderColorChecked='red'
                        borderColorUnChecked='green'
                        color='white'
                        backgroundColorChecked='yellow'
                        backgroundColorUnChecked='pink'

                        onChange={(checked) => Alert.alert('Ae'+ checked)}
                    />
                </View>
                <View style={styles.taskCellInfo}>
                    <View style={styles.alignCell}>
                        <Text>
                        {this.props.task.title}
                        </Text>      
                    </View>
                <View style={styles.taskAlert}>
                <Text>
                    XX
                    {/* <Bell/> */}
                </Text>
                <Text>
                    {this.props.task.date}
                    -
                    {this.props.task.hour}
                </Text>
                </View>
                </View>
            </View>

        </Swipeout>
      );
    }
  }

const styles = StyleSheet.create({
    taskCell: {
        flexDirection: 'row',
        padding: 8, 
        paddingTop: 8, 
        paddingBottom: 8, 
        borderBottomWidth: StyleSheet.hairlineWidth,
        flex: 1,
        backgroundColor: 'white'
    },
    checkBoxArea: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    taskCellInfo: {
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