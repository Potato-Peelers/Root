import React from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { List, ListItem } from 'react-native-elements';

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

export default class ShoppingListScreen extends React.Component {

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
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
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
  });

