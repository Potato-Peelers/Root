import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TabIcon = (props) => (
    <Ionicons name="camera" size={34} color={props.focused ? 'grey' : 'darkgrey'}/>
)

export default class ScannerScreen extends React.Component{
    static navigationOptions = {
        tabBarIcon: TabIcon
    };

    render(){
        return(
            <View><Text>Heeeeeyyyyy</Text></View>
        );
    }
}
