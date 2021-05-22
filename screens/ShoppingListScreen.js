//import React from 'react';
import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import firestore from '../src/firebase/config';
import { LogBox } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const TabIcon = (props) => (
  <Ionicons
    name={'md-cart'}
    size={35}
    color={props.focused ? 'grey' : 'darkgrey'}
  />
)
const Color = {
  primary: '#0CB0D3',
  secondry: '#5FD9F3',
  white: '#ffffff'
}
const user ='qlw4YNAfCtUAJrSCFWly';

export default function ShoppingListScreen() {
  const navigationOptions = {
    tabBarIcon: TabIcon
  };
  const [itemList, setItemList]=useState([])
  const [itemName, setItemName] = useState("");
  var db = firestore.collection('users').doc(user).collection('shoppinglist').doc('week2');

  //console.log(" shopping list screen ")
  //const [blogs,setBlogs]=useState([])
  const fetchPantryItems = () => {
    const response=db.collection('pantrylist'); // returns list of docs
    data.docs.forEach(item=>{
       //setItems([...items,item.data()])
       console.log("item retrieved")
    })
    //const snapshot = await db.get();  // returns collection in week2
    console.log(" items read from db")
    db.collection("pantrylist").onSnapshot(function (querySnapshot) {
        const list = querySnapshot.docs.map((doc) => ({
          id : doc.id,
          name: doc.data().name,
          type: doc.data().type
        }));
        setItemList(list);
        console.log("itemlist", list)
    });
  }

 const useEffect2 = () => {
    if (orgList.length > 0) {
       return; // we already have data, so no need to run this again
    }

    const unsubscribe = firebase
      .firestore()
      .collection('users').doc(user).collection('shoppinglist').doc('week2').collection("pantrylist")
      .onSnapshot((snapshot) => {
        const orgList = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          type: doc.data().type
        }));
        setItemList(orgList);
        console.log("orglist", orgList)
      }, () => {
        setError(true)
      });
      setLoading(false);
      return() => unsubscribe();
   } 

  const useEffect = () => {
    //fetchPantryItems();  // fetch it first time when app runs
    getItems()
  }

  const addItem = () => {
    console.log("add item called")
    db.collection("pantrylist").add({ // pantrylist is a collection containing item documents
      name: itemName,
      type: "Grocery"
    });
    setItemName("");
    getItems()
  }
  

  const updateItem = () => { // accept id as an argument
    db.collection("pantrylist").doc(id).update({
        type: "Unknown"
    });
  }

  const getItems = () => {
    console.log("get items called ")
    db.collection("pantrylist").get().then ((querySnapshot) => {
      const list = querySnapshot.docs.map((doc) => ({
        id : doc.id,
        name: doc.data().name,
        type: doc.data().type
      }));
      setItemList(list);
      //console.log("itemlist", list)
    });
  }

  const deleteItem = (id) => { // accept id as an argument
    console.log("delete Item called ")
    db.collection("pantrylist").doc(id).delete();
    getItems()
  }
  const renderItemComponent = (itemData) => {// 1
  <TouchableOpacity>   // 2
      <Text style={styles.buttonText}> {itemData.name} </Text>
  </TouchableOpacity>
  }
  return (
    <SafeAreaView style={styles.container}>
      <TextInput style={styles.appButtonText}
        placeholder="Enter Item Here"
        onChangeText={(itemName) => { setItemName( itemName )}}
        value = { itemName }
        underlineColorAndroid='transparent'
      />
      <TouchableOpacity onPress={() => addItem()} activeOpacity={0.7} style={styles.appButtonText} >
        <Text style={styles.buttonText}> Add Items </Text>

      </TouchableOpacity>
         <FlatList
            data={itemList}
            //renderItem={item => renderItemComponent(item)}
           // renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
            renderItem={({ item, index }) => <TouchableOpacity key={index} onPress={()=>{deleteItem(item.id)}}><Text style={styles.item} >{item.name}</Text></TouchableOpacity>}
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
    appButtonText: {
      fontSize: 18,
      alignSelf: "center",
      padding: 10,
    }
  });

