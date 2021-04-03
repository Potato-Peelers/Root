import React, { Component } from 'react';

import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, TextInput,SafeAreaView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const TabIcon = (props) => (
  <Ionicons
    name={'md-list'}
    size={35}
    color={props.focused ? 'grey' : 'darkgrey'}
  />
)

export default class PantryListScreen extends React.Component {

  static navigationOptions = {
    tabBarIcon: TabIcon
  };

  constructor(props) {
    
    super(props);

    this.array = [{}
    ],

      this.state = {

        arrayHolder: [],
         textInput_Holder: ''
        }
        this.deleteData = this.deleteData.bind(this)
  }
componentDidMount() {
    this.setState({ arrayHolder: [...this.array] })
 }

 joinData = () => {
  this.array.push({title : this.state.textInput_Holder});
  this.setState({ arrayHolder: [...this.array] })

}
deleteData = (t) =>{
  let itemsCopy = [...this.state.arrayHolder]
  itemsCopy.splice(t,1);
  this.setState({arrayHolder: itemsCopy});

}

FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#607D8B",
      }}
    />
  );
}
/*
GetItem(item) {

  Alert.alert(item);

}
*/

render() {
  return (

    <SafeAreaView style={styles.container}>

      <TextInput
        placeholder="Enter Item Here"
        onChangeText={data => this.setState({ textInput_Holder: data })}
        style={styles.textInputStyle}
        underlineColorAndroid='transparent'
      />

      <TouchableOpacity onPress={this.joinData} activeOpacity={0.7} style={styles.button} >

        <Text style={styles.buttonText}> Add Items to Pantry </Text>

      </TouchableOpacity>

      <FlatList

        data={this.state.arrayHolder}

        width='100%'

        extraData={this.state.arrayHolder}

        keyExtractor={(index) => index.toString()}

        ItemSeparatorComponent={this.FlatListItemSeparator}

        renderItem={({ item, index }) => <TouchableOpacity key={index} onPress={()=>{this.deleteData(index)}}><Text>{item.title}</Text></TouchableOpacity>}
        />
      </SafeAreaView>

  );
}
}

const styles = StyleSheet.create({

  MainContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2

  },

  pitem: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

  textInputStyle: {

    textAlign: 'center',
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 7,
    fontSize: 18,
    marginTop: 12
  },

  button: {

    width: '90%',
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    fontSize: 18,
    marginTop: 10
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },

});