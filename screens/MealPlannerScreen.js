import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import MealList from './MealComponent';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

const TabIcon = (props) => (
    <Ionicons name="calendar" size={34} 
    color={props.focused ? 'grey' : 'darkgrey'} />
)

export default function MealPlannerScreen(){
    const navigationOptions = {
        tabBarIcon: TabIcon
    };
    var today = new Date();
    var offset = null;
    switch(moment(today).format('dddd')){
        case 'Sunday': offset=0;
        case 'Monday': offset=-1;
        case 'Tuesday': offset=-2;
        case 'Wednesday': offset=-3;
        case 'Thursday': offset=-4;
        case 'Friday': offset=-5;
        case 'Saturday': offset=-6;
    }

    const goToday=()=>{
        setFirstDay(moment(today).add(offset, 'days'));
    }
    const handleSwipeLeft = () => {
        setFirstDay(moment(firstDay).add(7, 'days'))
    }
    const handleSwipeRight = () => {
        setFirstDay(moment(firstDay).subtract(7, 'days'))
    }
    const [firstDay, setFirstDay] = useState(moment(today).add(offset, 'days'));
    
    return (
        <View>
            <TouchableOpacity style={styles.todayButton} onPress={()=>goToday()}>
                <Text style={{color: 'white'}}>Today</Text>
            </TouchableOpacity>
            <GestureRecognizer onSwipeLeft={()=>handleSwipeLeft()} onSwipeRight={()=>handleSwipeRight()}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Text style={styles.title}>{moment(firstDay).format('MMMM YYYY')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.weekdayLabelContainer}>
                    <View style={styles.weekdayLabel}>
                        <Text style={styles.weekdayLabelText}>Sun</Text>
                    </View>
                    <View style={styles.weekdayLabel}>
                        <Text style={styles.weekdayLabelText}>Mon</Text>
                    </View>
                    <View style={styles.weekdayLabel}>
                        <Text style={styles.weekdayLabelText}>Tue</Text>
                    </View>
                    <View style={styles.weekdayLabel}>
                        <Text style={styles.weekdayLabelText}>Wed</Text>
                    </View>
                    <View style={styles.weekdayLabel}>
                        <Text style={styles.weekdayLabelText}>Thu</Text>
                    </View>
                    <View style={styles.weekdayLabel}>
                        <Text style={styles.weekdayLabelText}>Fri</Text>
                    </View>
                    <View style={styles.weekdayLabel}>
                        <Text style={styles.weekdayLabelText}>Sat</Text>
                    </View>
                </View>
                <View style={styles.weekdayNumberContainer}>
                    <TouchableOpacity style={styles.weekDayNumber}>
                        <View style={styles.weekDayNumberCircle}>
                            <Text style={styles.weekDayNumberTextToday}>
                            {moment(firstDay).format('D')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.weekDayNumber}>
                        <View style={styles.weekDayNumberCircle}>
                            <Text style={styles.weekDayNumberTextToday}>
                            {moment(firstDay).add(1, 'days').format('D')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.weekDayNumber}>
                        <View style={styles.weekDayNumberCircle}>
                            <Text style={styles.weekDayNumberTextToday}>
                            {moment(firstDay).add(2, 'days').format('D')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.weekDayNumber}>
                        <View style={styles.weekDayNumberCircle}>
                            <Text style={styles.weekDayNumberTextToday}>
                            {moment(firstDay).add(3, 'days').format('D')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.weekDayNumber}>
                        <View style={styles.weekDayNumberCircle}>
                            <Text style={styles.weekDayNumberTextToday}>
                            {moment(firstDay).add(4, 'days').format('D')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.weekDayNumber}>
                        <View style={styles.weekDayNumberCircle}>
                            <Text style={styles.weekDayNumberTextToday}>
                                {moment(firstDay).add(5, 'days').format('D')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.weekDayNumber}>
                        <View style={styles.weekDayNumberCircle}>
                            <Text style={styles.weekDayNumberTextToday}>
                                {moment(firstDay).add(6, 'days').format('D')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </GestureRecognizer>
            <MealList first={firstDay}/>
        </View>
    )
}

const styles = StyleSheet.create({
    rootStyle: {
        backgroundColor: '#212F45',
       // width: Dimensions.get('window').width,
        alignItems: 'center',
        height: '100%',
        borderColor: '#212F45',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth
    },

    title: {
        color: '#2EC4B6',
        fontWeight: 'bold',
        fontSize: 20,
    },

    header: {
        width: '100%',
        flexDirection: 'row',
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 3
    },

    weekdayLabel: {
        flex: 1,
        alignItems: 'center'
    },

    weekdayLabelText: {
        color: '#FE6E64',
    }, 

    weekdayLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },

    weekDayNumberCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        backgroundColor: '#FE6E64',
        borderRadius: 25,
    },

    weekDayNumberTextToday : {
        color: 'white'
    },

    weekdayNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    weekDayNumber: {
        flex: 1,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    dot: {
        width: 4,
        height: 4,
        marginTop: 1,
        alignSelf: 'center',
        borderRadius: 2,
        position: 'absolute',
        bottom: '10%'
    },

    dateSideLabel: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },

    numberSideLabel: {
        fontFamily: 'montserrat-regular',
        color: 'white',
        fontSize: 30,
    },

    dayOfWeekSideLabel: {
        color: 'white',
        fontSize: 15,
    },

    mealName: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 10,
        color: 'white',
    },

    verticalLineUnderCircleButtons: {
        width: '100%',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        paddingVertical: 5
    },
    todayButton: {
        backgroundColor: '#14274e',
        alignSelf: 'center',
        width: 70,
        alignItems: 'center',
    },
    
});