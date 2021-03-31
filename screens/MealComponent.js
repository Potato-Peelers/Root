import React, {useState, useEffect} from 'react';
import { Text, View, Keyboard, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput, FlatList } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../src/firebase/config';
import { SafeAreaView } from 'react-navigation';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { render } from 'react-dom';

export default function MealList (props){

    useEffect(() => {
        setDays([props.first, moment(props.first).add(1, 'days'), moment(props.first).add(2, 'days'), moment(props.first).add(3, 'days'), moment(props.first).add(4, 'days'), moment(props.first).add(5, 'days'), moment(props.first).add(6, 'days')])
    }, [props.first])
    var db = firebase.firestore().collection('users');
    const [DATA, setDATA] = useState([
        {
            date: '2021-03-18',
            "BREAKFASTname": 'fda',
            "LUNCHname": 'fdsa',
            "DINNERname": 'fdsag',
        },
        {
            date: '2021-03-19',
            
        },
        {
            date: '2021-03-20',
            
        },
        {
            date: '2021-03-20',
            
        },
        {
            date: '2021-03-20',
            
        },
        {
            date: '2021-03-20',
            
        },
        {
            date: '2021-03-20',
            
        }
    ]);
    const [days, setDays] = useState([props.first, moment(props.first).add(1, 'days'), moment(props.first).add(2, 'days'), moment(props.first).add(3, 'days'), moment(props.first).add(4, 'days'), moment(props.first).add(5, 'days'), moment(props.first).add(6, 'days')])
/*
    const handleInputChange = (text, index, name) => {
        //let newArr = [...DATA];
        //newArr[index].name = text;
        //setDATA(newArr);
    }

    const handleClear = (index, name) => {
        let newArr = [...DATA];
        newArr[index].name = " ";
        setDATA(newArr);
    }

    const handleAddMeal = (index) => {
        let newArr = [...DATA];
        newArr[index] = {...newArr[index], "OTHERMEALname": ""}
    }
*/
    const renderItem = (day) => {
        return(
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'black', size: 20}}>{moment(day).format('MMMM Do YYYY')}</Text>
                    <TouchableOpacity >
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', backgroundColor: 'pink'}}>
                    <View style={{flexDirection: 'column', borderWidth: 2, borderColor: 'black'}}>
                        <Text>B</Text>
                        <Text>R</Text>
                        <Text>E</Text>
                        <Text>A</Text>
                        <Text>K</Text>
                        <Text>F</Text>
                        <Text>A</Text>
                        <Text>S</Text>
                        <Text>T</Text>
                    </View>
                    <View style={{flexDirection: 'column', flex: 6}}>
                        <View style={{flexDirection: 'row', flex: 2}}>
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Meal'} defaultValue={DATA[0].BREAKFASTname} />
                            <TouchableOpacity >
                                <Ionicons name="trash" size={14}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', flex: 2}}>
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Ingredients'} defaultValue={DATA[0].BREAKFASTingredients} />
                            <TouchableOpacity>
                                <Ionicons name="trash" size={14}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', flex: 2}}>
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Other'} defaultValue={DATA[0].BREAKFASTother} />
                            <TouchableOpacity>
                                <Ionicons name="trash" size={14}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row', backgroundColor: '#FFFCBB'}}>
                    <View style={{flexDirection: 'column', borderWidth: 2, borderColor: 'black'}}>
                        <Text>L</Text>
                        <Text>U</Text>
                        <Text>N</Text>
                        <Text>C</Text>
                        <Text>H</Text>
                    </View>
                    <View style={{flexDirection: 'column', flex: 6}}>
                        <View style={{flexDirection: 'row', flex: 2}}>
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Meal'} defaultValue={DATA[0].LUNCHname} />
                            <TouchableOpacity>
                                <Ionicons name="trash" size={14}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', flex: 2}}>
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Ingredients'} defaultValue={DATA[0].LUNCHingredients} />
                            <TouchableOpacity>
                                <Ionicons name="trash" size={14}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', flex: 2}}>
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Other'} defaultValue={DATA[0].LUNCHother} />
                            <TouchableOpacity>
                                <Ionicons name="trash" size={14}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row', backgroundColor: '#B7E9F7'}}>
                    <View style={{flexDirection: 'column', borderWidth: 2, borderColor: 'black'}}>
                        <Text>D</Text>
                        <Text>I</Text>
                        <Text>N</Text>
                        <Text>N</Text>
                        <Text>E</Text>
                        <Text>R</Text>
                    </View>
                    <View style={{flexDirection: 'column', flex: 6}}>
                        <View style={{flexDirection: 'row', flex: 2}}>
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Meal'} defaultValue={DATA[0].DINNERname} />
                            <TouchableOpacity>
                                <Ionicons name="trash" size={14}/>
                            </TouchableOpacity>
                            
                        </View>
                        <View style={{flexDirection: 'row', flex: 2}}>
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Ingredients'} defaultValue={DATA[0].DINNERingredients} />
                            <TouchableOpacity>
                                <Ionicons name="trash" size={14}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', flex: 2}}>
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Other'} defaultValue={DATA[0].DINNERother} />
                            <TouchableOpacity>
                                <Ionicons name="trash" size={14}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    return(
        <View>
            <SafeAreaView>
                <ScrollView>
                    {days.map((day) => {
                        return(
                        renderItem(day)
                        );
                    })}
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        
    }
})










