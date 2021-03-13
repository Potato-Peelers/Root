import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard} from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();

  const [taskItems, setTaskItems] = useState([]);

  {/* when calling a function, use () => functionName(). Sometimes this can be used through onClick */}
  const handleAddTask = () => {
    Keyboard.dismiss();
    {/* Puts everything in taskItems in a new array, and then appends task*/}
    setTaskItems([...taskItems, task])
    setTask(null)
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy); 
  }

  const sortByDate = (a,b) => {
    return a.date - b.date;
}
  return (
    <View style={styles.container}>
      {/*Todat's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}> Expiration Date Tracker</Text>

        <View style={styles.items}>
          {/* This is where the tasks will go: /* This will get the taskItems array (the one where new tasks get added to, and will display them through the map iteration) */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item}/>
                </TouchableOpacity>
              )
            })
          }
        </View>

      </View>

      {/* Write a task */}
      <KeyboardAvoidingView 
        behavior ={Platform.OS == "ios" ? "padding" : "height"} 
        style={styles.writeTaskWrapper}>
          <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
          {/* Add Button */}
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text>+</Text>
            </View>
          </TouchableOpacity>


      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    paddingTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderColor: '#C0C0C0',
    borderRadius: 60,
    borderWidth: 1,
  },
  datePicker: {
    paddingVertical: 15,
    width: 75,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderColor: '#C0C0C0',
    borderRadius: 60,
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderColor: '#C0C0C0',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
