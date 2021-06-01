//import React from 'react';
import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView, TouchableOpacity, TextInput, StatusBar,Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import firestore from '../src/firebase/config';
import { LogBox } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";

import { Ionicons } from '@expo/vector-icons';

export default function PantryListScreen() {  // Expiration tracker
  const navigationOptions = {
    tabBarIcon: TabIcon
  };

const Color = {
  primary: '#0CB0D3',
  secondry: '#5FD9F3',
  white: '#ffffff'
}
const user ='qlw4YNAfCtUAJrSCFWly';
  const TabIcon = (props) => (
    <Ionicons
      name={'md-cart'}
      size={35}
      color={props.focused ? 'grey' : 'darkgrey'}
    />
  )
  const [itemList, setItemList]=useState([])
  const [itemName, setItemName] = useState("");
  const [expDate,  setExpDate]  = useState(new Date(Date.now()));
  const [datePickerVisibility, setDatePickerVisibility] = useState(true);

  var db = firestore.collection('users').doc(user).collection('expirationdate').doc('list');

  //console.log(" shopping list screen ")

  useEffect(() => {
    //fetchPantryItems();  // fetch it first time when app runs
    getExpItems()
    setDatePickerVisibility(true)
  })

  const addItem = () => {
    //console.log("add exp item called")
    db.collection("expiration").add({ // pantrylist is a collection containing item documents
      name: itemName,
      expiration: expDate.toUTCString()
    });
    setItemName("");
    setExpDate(new Date(Date.now()))
    getExpItems()
  }
  

  const updateItem = () => { // accept id as an argument
    db.collection("expiration").doc(id).update({
        type: "Unknown"
    });
  }

  const getExpItems = () => {
    //console.log("get exp items called ")
    db.collection("expiration").get().then ((querySnapshot) => {
      const list = querySnapshot.docs.map((doc) => ({
        id : doc.id,
        name: doc.data().name,
        expiration: doc.data().expiration
      }));
      setItemList(list);
      //console.log("itemlist", list)
    });
  }

  const deleteItem = (id) => { // accept id as an argument
    //console.log("delete Item called ")
    db.collection("expiration").doc(id).delete();
    getExpItems()
  }
  const handleConfirm = (date) => {
    //console.warn("A date has been picked: ", date);
    setExpDate(date)
    hideDatePicker();
  }
  
  const showDatePicker = () => {
    console.log("show picker   true called ")
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }
  const renderItemComponent = (itemData) => {// 1
  <TouchableOpacity>
      <Text style={styles.buttonText}> {itemData.name} </Text>
  </TouchableOpacity>
  }
  return (
    <SafeAreaView style={styles.container}>
      <TextInput style={styles.appButtonText}
        placeholder="Enter Pantry Exp Item Here"
        onChangeText={(itemName) => { setItemName( itemName )}}
        value = { itemName }
        underlineColorAndroid='transparent'
      />
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePicker isVisible={datePickerVisibility}
      mode="date" 
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      />
      <Text style={styles.pickedDate}>{expDate.toUTCString()}</Text>
      <TouchableOpacity onPress={() => addItem()} activeOpacity={0.7} style={styles.appButtonText} >
        <Text style={styles.appButtonText}> Add Items </Text>

      </TouchableOpacity>
         <FlatList
            data={itemList}
            //renderItem={item => renderItemComponent(item)}
           // renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
            renderItem={({ item, index }) => <TouchableOpacity key={index} onPress={()=>{deleteItem(item.id)}}><Text style={styles.item} >{item.name + " expires on  " + item.expiration}</Text></TouchableOpacity>}
            keyExtractor={item => item.id.toString()}
            //ItemSeparatorComponent={this.ItemSeparator}
          /> 
    </SafeAreaView>
 );

}

/*export default class ShoppingListScreen extends React.Component {

<FlatList
        data={itemList}
        numColumns={1}
        ListEmptyComponent={
          <View style={styles.flatListEmpty}>
            <Text style={{fontWeight: 'bold'}}> Add Items Below </Text>
          </View>
        }
        renderItem = {({ item }) => (
          <View style={styles.flatListStyle}>
            <Item title={item.name} />
          </View>
        )}
      /> 

  static navigationOptions = {
    tabBarIcon: TabIcon
  };
  constructor(props) {
    super(props);
  }

  render() {
    const list = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Bagels',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Cream Cheese',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Orange Juice',
      },
    ];
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  
  const renderItem = ({ item }) => (
      <Item title={item.title} />
  );

  return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
   );
  }
}*/
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,
      height: 50,
      padding: 10,
    },
    item: {
      backgroundColor: '#0CB0D3',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 22,
    },
    pickedDate: {
      fontSize: 18,
      color: 'black',
      padding: 10,
      alignSelf: 'center',
    },
    appButtonText: {
      fontSize: 18,
      color: 'green',
      alignSelf: "center",
      padding: 10,
    }
  });

