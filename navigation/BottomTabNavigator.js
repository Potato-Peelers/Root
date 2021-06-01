import React from 'react';
import {View,Text} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import PantryListScreen from '../screens/PantryListScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ScannerScreen from '../screens/ScannerScreen';
import MealPlannerScreen from '../screens/MealPlannerScreen';
// import ExpirationDate from '../screens/ExpirationDate';

const BottomTabNavigator = createBottomTabNavigator({
  One: { screen: PantryListScreen, navigationOptions: { 
    tabBarIcon: ({ tintColor }) => <Ionicons name="ios-list-circle" size={35} color="black" />}},
  Two: { screen: ShoppingListScreen, navigationOptions: {
    tabBarIcon: ({ tintColor }) => <Ionicons name="ios-cart" size={35} color="black" />}},
  Three: { screen: SettingsScreen, navigationOptions: {
    tabBarIcon: ({ tintColor }) => <Ionicons name="ios-analytics" size={35} color="black" />}},
  Four: { screen: ScannerScreen, navigationOptions: {
    tabBarIcon: ({ tintColor }) => <Ionicons name="ios-camera" size={35} color="black" />}},
  Five: { screen: MealPlannerScreen, navigationOptions: {
    tabBarIcon: ({ tintColor }) => <Ionicons name="ios-bookmarks-outline" size={35} color="black" />}},
  
}, {
  tabBarOptions: {
    showLabel: false
  }
});

export default BottomTabNavigator;

//https://medium.com/swlh/react-native-tab-navigation-a373463aa60
