import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

const TabIcon = (props) => (
    <Ionicons name="calendar" size={34} 
    color={props.focused ? 'grey' : 'darkgrey'} />
)

export default class MealPlannerScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: TabIcon
    };

    constructor(props) {
        super(props);

        this.state = {
            items: {
            '2017-05-22': [{name: 'PIZZA', type: 'breakfast', height: 100}],
            '2017-05-23': [{name: 'ICE CREAM', height: 100, type: 'lunch'}],
            '2017-05-25': [{name: 'WAFFLES', type: 'breakfast', height: 100}, {name: 'FUN', type: 'lunch', height: 100}]
            }
        };
        }

        render() {
        const breakfast = {key: 'breakfast', color: '#212F45', selectedDotColor: '#212F45'};
        const lunch = {key: 'lunch', color: '#212F45', selectedDotColor: '#212F45'};
        const dinner = {key: 'dinner', color: '#212F45', selectedDotColor: '#212F45'};
        return (
            <Agenda
            //testID={testIDs.agenda.CONTAINER}
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            selected={'2017-05-16'}
            markingType={'multi-dot'}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            /*markedDates={{
                '2017-05-14': {startingDay: true, endingDay: true},
                '2017-05-25': {dots: [breakfast]},
                '2017-05-23': {dots: [breakfast, lunch, dinner]},
                '2017-05-26': {endingDay: true}}}
            */
                // monthFormat={'yyyy'}
            theme={{
                backgroundColor: '#212F45',
                //calendarBackground: '#2EC4B6',
                agendaDayTextColor: 'white',
                agendaDayNumColor: 'white',
            }}
            /*renderDay={(day, item) => (
                <View style={styles.verticalLine}>
                    <Text>
                        {day ? day.day : null}
                    </Text>
                </View>
            )}
            */
            // hideExtraDays={false}
            />
        );
    }

    loadItems(day) {
    setTimeout(() => {
        for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
            this.state.items[strTime] = [];
            
        }
        }
        const newItems = {};
        Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
        });
        this.setState({
        items: newItems
        });
    }, 1000);
    }

    renderItem(item) {
        return (
            <View>
                <TouchableOpacity
                    //testID={testIDs.agenda.ITEM}
                    style={[styles.item, {height: item.height}]}
                    //onPress={() => Alert.alert(item.name)}
                >
                    <Text>{item.type}{"\n"}{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderDay(day, item) {
        return (
            <View>
                <Text>{day.toString('dddd d MMMM yyyy')}</Text>
            </View>
        );
        
    }

    renderEmptyDate() {
    return (
        <View></View>
        //<View style={styles.item}>
        //    <Text style={{color: 'white'}}></Text>
        //</View>
    );
    }

    rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
    }

    timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30
    },
    verticalLine: {
        borderRightWidth: 1,
        borderRightColor: 'white',
        height: 50,
        width: 50,
        marginTop: 10,
        marginRight: 10,
    }
  });