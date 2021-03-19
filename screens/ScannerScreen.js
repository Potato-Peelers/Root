import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef, Component } from 'react';
import { Text, View, ImageBackground, TextInput, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Modal, Platform, ActivityIndicator, Button } from 'react-native';
import {Camera} from 'expo-camera';

const TabIcon = (props) => (
    <Ionicons name="camera" size={34} color={props.focused ? 'grey' : 'darkgrey'}/>
)

export default function ScannerPage (){
    const [startCamera, setStartCamera] = React.useState(false);
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null)
    const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)

    const __startCamera = async () => {
        const {status} = await Camera.requestPermissionsAsync()
        if (status === 'granted') {
            // start the camera
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
    }
    const __switchCamera = () => {
        if (cameraType === 'back') {
          setCameraType('front')
        } else {
          setCameraType('back')
        }
    }
    const __retakePicture = () => {
        setCapturedImage(null)
        setPreviewVisible(false)
        __startCamera()
    }
    const __takePicture = async () => {
        if (!camera) return
        const photo = await camera.takePictureAsync()
        console.log(photo)
        setPreviewVisible(true)
        setCapturedImage(photo)
      }

    const  __savePicture = async () => {
        return (
            <View style={{height: '100%', width: '100%', flex: 1, backgroundColor: 'transparent'}}>
                <TextInput>Ingredients</TextInput>
            </View>
        );
    }

      const CameraPreview = ({photo}) => {
        console.log('hi', photo)
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
            />
            <TouchableOpacity
                onPress={__retakePicture}
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
                        Retake
                    </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={__savePicture}
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
                        Save
                    </Text>
            </TouchableOpacity>
          </View>
        )
      }      

    return(
        startCamera ? (
            previewVisible && capturedImage ? (
                <CameraPreview photo={capturedImage} />

            ) : (
                <Camera
                    type={cameraType}
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
                        <TouchableOpacity
                            onPress={__switchCamera}
                            style={{
                            marginTop: 20,
                            borderRadius: '50%',
                            height: 40,
                            width: 40
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 20
                                }}
                                >
                            {cameraType === 'front' ? 'Flip' : 'Flip'}
                            </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Camera>
              )
            ) : (
            <View
                style={{
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center'
                }}
            >
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
                        Scan plate
                    </Text>
                </TouchableOpacity>
            </View>
        )
    );
}
