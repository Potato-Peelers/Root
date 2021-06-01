import {StatusBar} from 'expo-status-bar'
import React, {useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native'
import {Camera} from 'expo-camera'
import firestore from '../src/firebase/config';
import moment from 'moment';
import { createMultiStyleIconSet } from '@expo/vector-icons';

const TabIcon = (props) => (
    <Ionicons name="camera" size={34} color={props.focused ? 'grey' : 'darkgrey'}/>
)

let camera = Camera //let camera: Camera
const user = 'qlw4YNAfCtUAJrSCFWly'
 
export default function ScannerScreen() {
 var today = new Date()
 var db = firestore.collection('users').doc(user).collection('leftovers');
 var segItems = []
 const [startCamera, setStartCamera] = useState(false)
 const [previewVisible, setPreviewVisible] = useState(false)
 const [capturedImage, setCapturedImage] = useState(null)
 const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
 const [flashMode, setFlashMode] = useState('off')
 const [activeModalIndex, setActiveModalIndex] = useState(-1)
 const __startCamera = async () => {
   const {status} = await Camera.requestPermissionsAsync()
   if (status === 'granted') {
     setStartCamera(true)
   } else {
     Alert.alert('Access denied')
   }
 }
 const __takePicture = async () => {
   const photo = await camera.takePictureAsync() //const photo: any = await camera.takePictureAsync()
   console.log(photo)
   setPreviewVisible(true)
   setCapturedImage(photo)
 }
 const __savePhoto = () => {
   setStartCamera(false)
  
   segItems = [["url", ["apple", "pear"], .31], ["url2", ["icecream", "soda"], .5]]
 
   db.doc(moment(today).format('MM-D-YY')).set({}, {merge: true})
   today = new Date()
   db = firestore.collection('users').doc(user).collection('leftovers').doc(moment(today).format('MM-D-YY'))
   segItems.map((item, index) => {
     eval('db.update({' + item[1][0] + ': item[2]})')
   })
   setActiveModalIndex(0)
   setPreviewVisible(false)
 }
 const __retakePicture = () => {
   setCapturedImage(null)
   setPreviewVisible(false)
   __startCamera()
 }
 const __handleFlashMode = () => {
   if (flashMode === 'on') {
     setFlashMode('off')
   } else if (flashMode === 'off') {
     setFlashMode('on')
   } else {
     setFlashMode('auto')
   }
 }
 const __switchCamera = () => {
   if (cameraType === 'back') {
     setCameraType('front')
   } else {
     setCameraType('back')
   }
 }
 const changeSelectedFood = (name, index) => {
   db.doc(index).set({food: name})
 }
 return (
   <View style={styles.container}>
     {startCamera ? (
       <View
         style={{
           flex: 1,
           width: '100%'
         }}
       >
         {previewVisible && capturedImage ? (
           <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
         ) : (
           <Camera
             type={cameraType}
             flashMode={flashMode}
             style={{flex: 1}}
             ref={(r) => {
               camera = r
             }}
           >
             <View
               style={{
                 flex: 1,
                 width: '100%',
                 backgroundColor: 'transparent',
                 flexDirection: 'row'
               }}
             >
               <View
                 style={{
                   position: 'absolute',
                   left: '5%',
                   top: '10%',
                   flexDirection: 'column',
                   justifyContent: 'space-between'
                 }}
               >
                 <TouchableOpacity
                   onPress={__handleFlashMode}
                   style={{
                     backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                     borderRadius: '50%',
                     height: 25,
                     width: 25
                   }}
                 >
                   <Text
                     style={{
                       fontSize: 20
                     }}
                   >
                     ⚡️
                   </Text>
                 </TouchableOpacity>
                 <TouchableOpacity
                   onPress={__switchCamera}
                   style={{
                     marginTop: 20,
                     borderRadius: '50%',
                     height: 25,
                     width: 25
                   }}
                 >
                   <Text
                     style={{
                       fontSize: 20
                     }}
                   >
                     {cameraType === 'front' ? '🤳' : '📷'}
                   </Text>
                 </TouchableOpacity>
               </View>
               <View
                 style={{
                   position: 'absolute',
                   bottom: 0,
                   flexDirection: 'row',
                   flex: 1,
                   width: '100%',
                   padding: 20,
                   justifyContent: 'space-between'
                 }}
               >
                 <View
                   style={{
                     alignSelf: 'center',
                     flex: 1,
                     alignItems: 'center'
                   }}
                 >
                   <TouchableOpacity
                     onPress={__takePicture}
                     style={{
                       width: 70,
                       height: 70,
                       bottom: 0,
                       borderRadius: 50,
                       backgroundColor: '#fff'
                     }}
                   />
                 </View>
               </View>
             </View>
           </Camera>
         )}
       </View>
     ) : (
       <View
         style={{
           flex: 1,
           backgroundColor: '#fff',
           justifyContent: 'center',
           alignItems: 'center'
         }}
       >
         {//segItems != null &&
           segItems.map((item, index) => activeModalIndex === index &&
             <Modal
               style={styles.modal}
               coverScreen = {false}
               isVisible={true}>
                 <Image>{item[0]}</Image>
                 {item[1].map(food =>
                   <TouchableOpacity onPress={() => changeSelectedFood(food[0], index)}>
                     <Text>{food[0]}</Text>
                   </TouchableOpacity>
                 )}
                 <TouchableOpacity onPress={() => deleteSelectedFood(food[0], index)}>
                   <Text>Delete</Text>
                 </TouchableOpacity>
                 <View>
                   <TouchableOpacity
                     onPress = {() => setActiveModalIndex(activeModalIndex+1)}
                   >
                     <Text>Done</Text>
                   </TouchableOpacity>
                 </View>
                 <View>
                   <TouchableOpacity
                     onPress = {() => setActiveModalIndex(-1)}
                   >
                     <Text>Cancel</Text>
                   </TouchableOpacity>
                 </View>
             </Modal>
           )
         }
         <TouchableOpacity
           onPress={__startCamera}
           style={{
             width: 130,
             borderRadius: 4,
             backgroundColor: '#14274e',
             flexDirection: 'row',
             justifyContent: 'center',
             alignItems: 'center',
             height: 40
           }}
         >
           <Text
             style={{
               color: '#fff',
               fontWeight: 'bold',
               textAlign: 'center'
             }}
           >
             Take picture
           </Text>
         </TouchableOpacity>
       </View>
     )}
 
     <StatusBar style="auto" />
   </View>
 )
}
 
const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center'
 },
 modal:{
   zIndex: 100,
   justifyContent: 'center',
   alignSelf: 'center',
   alignContent: 'center'
 }
})
 
const CameraPreview = ({photo, retakePicture, savePhoto}) => { //const CameraPreview = ({photo, retakePicture, savePhoto}: any) => {
 console.log('sdsfds', photo)
 return (
   <View
     style={{
       backgroundColor: 'transparent',
       flex: 1,
       width: '100%',
       height: '100%'
     }}
   >
     <ImageBackground
       source={{uri: photo && photo.uri}}
       style={{
         flex: 1
       }}
     >
       <View
         style={{
           flex: 1,
           flexDirection: 'column',
           padding: 15,
           justifyContent: 'flex-end'
         }}
       >
         <View
           style={{
             flexDirection: 'row',
             justifyContent: 'space-between'
           }}
         >
           <TouchableOpacity
             onPress={retakePicture}
             style={{
               width: 130,
               height: 40,
 
               alignItems: 'center',
               borderRadius: 4
             }}
           >
             <Text
               style={{
                 color: '#fff',
                 fontSize: 20
               }}
             >
               Retake
             </Text>
           </TouchableOpacity>
           <TouchableOpacity
             onPress={savePhoto}
             style={{
               width: 130,
               height: 40,
 
               alignItems: 'center',
               borderRadius: 4
             }}
           >
             <Text
               style={{
                 color: '#fff',
                 fontSize: 20
               }}
             >
               save photo
             </Text>
           </TouchableOpacity>
         </View>
       </View>
     </ImageBackground>
   </View>
 )
}
 
 
/*
   await fetch('/seg').then(res => { //await fetch('/seg/${capturedImage.uri}').then(res => {
     segItems = res
   }).catch((error)=>{
     console.log("Api call error");
     alert(error.message);
  });
  */

