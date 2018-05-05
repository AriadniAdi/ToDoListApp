import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet,
    TextInput,
    ImageBackground
} from 'react-native';

export default class Task extends Component {
  render() {
    return (
      <ImageBackground source={require('../app/images/background_sample.png')} style={styles.task}>
          <View>
            <Text style={styles.defaultLabel}>Atividade:</Text>
            <CustomTextInput placeholder='ex: Estudar React Native...' onChangeText={(text) => this.props.onChangeTitle(text) } />
          </View>
          <View>
            <Text style={styles.defaultLabel}>Me lembrar de fazer em:</Text>
            <View style={{flexDirection: 'row'}}>
                <CustomTextInput placeholder='ex: 04/05/2018' styles={styles.dateAndHour} onChangeText={(text) => this.props.onChangeDate(text) } />
                <CustomTextInput placeholder='ex: 20:21' styles={styles.dateAndHour} onChangeText={(text) => this.props.onChangeHour(text) } />
            </View>
          </View>
      </ImageBackground>
    );
  }
}

export class CustomTextInput extends Component {
  render() {
    return (<View>
      <TextInput
        underlineColorAndroid='transparent' 
        placeholderTextColor='#efefef'
        style={[styles.defaultTextInput, this.props.styles]}
        placeholder={this.props.placeholder} 
        onChangeText={(text) => this.props.onChangeText(text) } />
      </View>
      )
  }
}

const styles = StyleSheet.create({
    defaultLabel: {
      marginTop: 20,
      marginBottom: 5,
      color: 'white'
    },
    defaultTextInput: {
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 6,
      paddingRight: 20,
      paddingLeft: 20,
      color: 'white'
    },
    dateAndHour: { 
      marginRight: 10,
      width: 140
    },
    task: {
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 20,
        paddingTop: 10,
        paddingBottom: 40,
        flex: 1
    }
  });