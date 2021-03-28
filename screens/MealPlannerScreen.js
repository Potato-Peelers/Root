/*
Errors:
- When entering meal and notes in a day w/o previous data, only notes is saved.
- Meals are not ordered properly
    - Is it necessary for users to be able to drag meals and order them?
*/

import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '../src/firebase/config';
import Modal from 'react-native-modal';

const TabIcon = (props) => (
    <Ionicons name="calendar" size={34} 
    color={props.focused ? 'grey' : 'darkgrey'} />
)
const user ='qlw4YNAfCtUAJrSCFWly';

export default function MealPlannerScreen(){
    const navigationOptions = {
        tabBarIcon: TabIcon
    };
    var db = firestore.collection('users').doc(user).collection('meals').doc('meals');
    var today = new Date();
    var offset = null;
    if (moment(today).format('dddd') == 'Sunday'){
        offset=0;
    }
    if (moment(today).format('dddd') == 'Monday'){
        offset=-1;
    }
    if (moment(today).format('dddd') == 'Tuesday'){
        offset=-2;
    }
    if (moment(today).format('dddd') == 'Wednesday'){
        offset=-3;
    }
    if (moment(today).format('dddd') == 'Thursday'){
        offset=-4;
    }
    if (moment(today).format('dddd') == 'Friday'){
        offset=-5;
    }
    if (moment(today).format('dddd') == 'Saturday'){
        offset=-6;
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
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState([null, null, null]);
    const [days, setDays] = useState([firstDay, moment(firstDay).add(1, 'days'), moment(firstDay).add(2, 'days'), moment(firstDay).add(3, 'days'), moment(firstDay).add(4, 'days'), moment(firstDay).add(5, 'days'), moment(firstDay).add(6, 'days')])
    const [data0, setdata0] = useState([])
    const [data1, setdata1] = useState([])
    const [data2, setdata2] = useState([])
    const [data3, setdata3] = useState([])
    const [data4, setdata4] = useState([])
    const [data5, setdata5] = useState([])
    const [data6, setdata6] = useState([])
    const [modalAdd, setModalAdd] = useState([false, null, null])
    const [newMeal, setNewMeal] = useState()
    const toggleModal = (day, mealtype, item) => {
        setModalData([day, mealtype, item]);
        setModalVisible(!modalVisible);
    }
    useEffect(() => {
        setDays([firstDay, moment(firstDay).add(1, 'days'), moment(firstDay).add(2, 'days'), moment(firstDay).add(3, 'days'), moment(firstDay).add(4, 'days'), moment(firstDay).add(5, 'days'), moment(firstDay).add(6, 'days')])
        let daystring = moment(firstDay).add(0, 'days').format('MM-D-YY');
        db.collection(daystring).get().then((query) => {
            if (!query.empty){
                let docs = query.docs;
                setdata0(docs)
            }
            else{
                setdata0(null)
            }
        })
        daystring = moment(firstDay).add(1, 'days').format('MM-D-YY');
        db.collection(daystring).get().then((query) => {
            if (!query.empty){
                let docs = query.docs;
                setdata1(docs)
            }
            else{
                setdata1(null)
            }
        })
        daystring = moment(firstDay).add(2, 'days').format('MM-D-YY');
        db.collection(daystring).get().then((query) => {
            if (!query.empty){
                let docs = query.docs;
                setdata2(docs)
            }
            else{
                setdata2(null)
            }
        })
        daystring = moment(firstDay).add(3, 'days').format('MM-D-YY');
        db.collection(daystring).get().then((query) => {
            if (!query.empty){
                let docs = query.docs;
                setdata3(docs)
            }
            else{
                setdata3(null)
            }
        })
        daystring = moment(firstDay).add(4, 'days').format('MM-D-YY');
        db.collection(daystring).get().then((query) => {
            if (!query.empty){
                let docs = query.docs;
                setdata4(docs)
            }
            else{
                setdata4(null)
            }
        })
        daystring = moment(firstDay).add(5, 'days').format('MM-D-YY');
        db.collection(daystring).get().then((query) => {
            if (!query.empty){
                let docs = query.docs;
                setdata5(docs)
            }
            else{
                setdata5(null)
            }
        })
        daystring = moment(firstDay).add(6, 'days').format('MM-D-YY');
        db.collection(daystring).get().then((query) => {
            if (!query.empty){
                let docs = query.docs;
                setdata6(docs)
            }
            else{
                setdata6(null)
            }
        })
    }, [firstDay, modalData, modalAdd])

    const handleChangeText = (text, type) => {
        const daystring = moment(modalData[0]).format('MM-D-YY');
        if (modalData[2]==null){
            db.collection(daystring).doc("breakfast").set({})
            db.collection(daystring).doc("lunch").set({})
            db.collection(daystring).doc("dinner").set({})
            db.collection(daystring).doc(modalData[1]).update({
                [type]: text,
            })
        }
        else{
            db.collection(daystring).doc(modalData[2].id).update({
                [type]: text,
            })
        }
        
    }
    const addMeal = (day) => {
        setModalAdd([true, day, null])
    }
    const doneAddModal = () => {
        if (modalAdd[2]!=null && modalAdd[2]!=""){
            db.collection(moment(modalAdd[1]).format('MM-D-YY')).doc(modalAdd[2]).set({})
        }
        setModalAdd([false, null, null])
    }
    const handleAddMeal = (text) => {
        let newModalAdd = modalAdd;
        newModalAdd[2] = text;
        setModalAdd(newModalAdd)
    }

    const renderItem = (day, index) => {
        const daystring = moment(day).format('MM-D-YY');
        const dataNum = "data" + index;
        const sizetest = eval(dataNum);
        return(
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'black', size: 20}}>{moment(day).format('MMMM Do YYYY')}</Text>
                    <TouchableOpacity onPress={() => addMeal(day)}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
                {sizetest!=null ? (
                <View>
                    {eval(dataNum).map((item) => 
                        <View>
                            <TouchableOpacity style={{flexDirection: 'row', backgroundColor: 'pink'}} onPress={()=> toggleModal(day, null, item)}>
                                <View style={{flexDirection: 'column', borderWidth: 2, borderColor: 'black'}}>
                                    <Text style={{width: 20}}>{item.id}</Text>
                                </View>
                                <View style={{flexDirection: 'column'}}>
                                    <View>
                                        <Text>Meal:</Text>
                                        <Text>{item.data().meal}</Text>
                                    </View>
                                    <View>
                                        <Text>Notes:</Text>
                                        <Text>{item.data().notes}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                ) : (
                    <View>
                        <TouchableOpacity style={{flexDirection: 'row', backgroundColor: 'pink'}} onPress={()=> toggleModal(day, "breakfast")}>
                            <View style={{flexDirection: 'column', borderWidth: 2, borderColor: 'black'}}>
                                <Text style={{width: 20}}>BREAKFAST</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'row', backgroundColor: 'pink'}} onPress={()=> toggleModal(day, "lunch")}>
                            <View style={{flexDirection: 'column', borderWidth: 2, borderColor: 'black'}}>
                                <Text style={{width: 20}}>LUNCH</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'row', backgroundColor: 'pink'}} onPress={()=> toggleModal(day, "dinner")}>
                            <View style={{flexDirection: 'column', borderWidth: 2, borderColor: 'black'}}>
                                <Text style={{width: 20}}>DINNER</Text>
                            </View>
                            <View>
                                <Text></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }
    return (
        <View style={{width: Dimensions.get("window").width, height: Dimensions.get("window").height}}>
            {(modalData!=null && modalVisible==true) && 
            <View style={{zIndex: 12, alignItems: 'center'}}>
                <Modal 
                style={styles.modal}
                coverScreen = {false}
                isVisible={modalVisible}
                >
                    {modalData[2]!=null ? (
                        <View style={{alignSelf: 'center', justifyContent: 'center', width: 500, height: 500, backgroundColor: 'white', alignSelf: 'center', alignContent: 'center', alignItems: 'center'}}>
                            <View>
                                <Text>{moment(modalData[0]).format('dddd MMMM Do YYYY')}</Text>
                            </View>
                            <View style={{flexDirection: 'column'}}>
                                <Text>Meal:</Text>
                                <TextInput multiline={true} textAlignVertical={'top'} defaultValue={modalData[2].data().meal} onChangeText={(text) => handleChangeText(text, "meal")}></TextInput>
                            </View>
                            <View style={{flexDirection: 'column'}}>
                                <Text>Notes:</Text>
                                <TextInput multiline={true} textAlignVertical={'top'} defaultValue={modalData[2].data().notes} onChangeText={(text) => handleChangeText(text, "notes")}></TextInput>
                            </View>
                            <TouchableOpacity onPress={()=>toggleModal(null, null)}>
                                <Text>Done</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{alignSelf: 'center', justifyContent: 'center', width: 500, height: 500, backgroundColor: 'white', alignSelf: 'center', alignContent: 'center', alignItems: 'center'}}>
                            <View>
                                <Text>{moment(modalData[0]).format('dddd MMMM Do YYYY')}</Text>
                            </View>
                            <View style={{flexDirection: 'column'}}>
                                <Text>Meal:</Text>
                                <TextInput multiline={true} textAlignVertical={'top'} onChangeText={(text) => handleChangeText(text, "meal")}></TextInput>
                            </View>
                            <View style={{flexDirection: 'column'}}>
                                <Text>Notes:</Text>
                                <TextInput multiline={true} textAlignVertical={'top'} onChangeText={(text) => handleChangeText(text, "notes")}></TextInput>
                            </View>
                            <TouchableOpacity onPress={()=>toggleModal(null, null)}>
                                <Text>Done</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Modal>
            </View>}
            {modalAdd[0]==true && 
            <View style={{zIndex: 14, alignItems: 'center'}}>
                <Modal 
                style={styles.modal}
                coverScreen = {false}
                isVisible={modalAdd[0]}
                >
                    <View style={{alignSelf: 'center', justifyContent: 'center', width: 500, height: 500, backgroundColor: 'white', alignSelf: 'center', alignContent: 'center', alignItems: 'center'}}>
                        <View>
                            <Text>{moment(modalAdd[1]).format('dddd MMMM Do YYYY')}</Text>
                        </View>
                        <Text>Meal name:</Text>
                        <TextInput onChangeText={(text) => handleAddMeal(text)}></TextInput>
                        <TouchableOpacity onPress={()=>doneAddModal(null)}>
                            <Text>Done</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>}
            <View style={{zIndex: -1}}>
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
                                {moment(days[0]).format('D')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.weekDayNumber}>
                            <View style={styles.weekDayNumberCircle}>
                                <Text style={styles.weekDayNumberTextToday}>
                                {moment(days[1]).format('D')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.weekDayNumber}>
                            <View style={styles.weekDayNumberCircle}>
                                <Text style={styles.weekDayNumberTextToday}>
                                {moment(days[2]).format('D')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.weekDayNumber}>
                            <View style={styles.weekDayNumberCircle}>
                                <Text style={styles.weekDayNumberTextToday}>
                                {moment(days[3]).format('D')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.weekDayNumber}>
                            <View style={styles.weekDayNumberCircle}>
                                <Text style={styles.weekDayNumberTextToday}>
                                {moment(days[4]).format('D')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.weekDayNumber}>
                            <View style={styles.weekDayNumberCircle}>
                                <Text style={styles.weekDayNumberTextToday}>
                                    {moment(days[5]).format('D')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.weekDayNumber}>
                            <View style={styles.weekDayNumberCircle}>
                                <Text style={styles.weekDayNumberTextToday}>
                                    {moment(days[6]).format('D')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </GestureRecognizer>
                <View>
                    <SafeAreaView>
                        <ScrollView>
                            {days.map((day, index) => {
                                return(
                                renderItem(day, index)
                                );
                            })}
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </View>
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
    modal:{
        zIndex: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'cemter'
    }
    
    
});