import React, {useState, useEffect} from 'react';
import { Text, View, Keyboard, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput, FlatList } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../src/firebase/config';
import { SafeAreaView } from 'react-navigation';
import moment from 'moment';

export default function MealList (props){
    var db = firebase.firestore();
    useEffect(() => {
        
    }, [])

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

    const renderItem = (item, index) => {
        return(
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'black', size: 20}}>{moment(props.firstDay).format('MMMM Do YYYY')}</Text>
                    <TouchableOpacity onPress={(index) => handleAddMeal(index)}>
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
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Meal'} defaultValue={DATA[index].BREAKFASTname} onChangeText={text=>(handleInputChange(text, index, "BREAKFASTname"))} />
                            <TouchableOpacity >
                                <Ionicons name="trash" size={14}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', flex: 2}}>
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Ingredients'} defaultValue={DATA[index].BREAKFASTingredients} onChangeText={text=>(item.BREAKFASTingredients=text)}/>
                            <TouchableOpacity>
                                <Ionicons name="trash" size={14}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', flex: 2}}>
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Other'} defaultValue={DATA[index].BREAKFASTother} onChangeText={text=>(item.BREAKFASTother=text)}/>
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
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Meal'} defaultValue={DATA[index].LUNCHname} onChangeText={text=>(item.LUNCHname=text)}/>
                            <TouchableOpacity>
                                <Ionicons name="trash" size={14}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', flex: 2}}>
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Ingredients'} defaultValue={DATA[index].LUNCHingredients} onChangeText={text=>(item.LUNCHingredients=text)}/>
                            <TouchableOpacity>
                                <Ionicons name="trash" size={14}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', flex: 2}}>
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Other'} defaultValue={DATA[index].LUNCHother} onChangeText={text=>(item.LUNCHother=text)}/>
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
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Meal'} defaultValue={DATA[index].DINNERname} onChangeText={text=>(item.DINNERname=text)}/>
                            <TouchableOpacity>
                                <Ionicons name="trash" size={14}/>
                            </TouchableOpacity>
                            
                        </View>
                        <View style={{flexDirection: 'row', flex: 2}}>
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Ingredients'} defaultValue={DATA[index].DINNERingredients} onChangeText={text=>(item.DINNERingredients=text)}/>
                            <TouchableOpacity>
                                <Ionicons name="trash" size={14}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', flex: 2}}>
                            <TextInput style={{width: '100%'}} multiline={true} textAlignVertical={'top'} placeholder={'Other'} defaultValue={DATA[index].DINNERother} onChangeText={text=>(item.DINNERother=text)}/>
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
                <FlatList 
                    data={DATA}
                    renderItem={({item, index}) => (renderItem(item, index))}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        
    }
})










