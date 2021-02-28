import React from 'react';
import {View,Text} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import PantryListScreen from '../screens/PantryListScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import SettingsScreen from '../screens/SettingsScreen';

const BottomTabNavigator = createBottomTabNavigator({
  One: PantryListScreen,
  Two: ShoppingListScreen,
  Three: SettingsScreen
}, {
  tabBarOptions: {
    showLabel: false
  }
});

export default BottomTabNavigator;

//https://medium.com/swlh/react-native-tab-navigation-a373463aa60