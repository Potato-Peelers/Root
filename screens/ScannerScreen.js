import React, {setState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

const TabIcon = (props) => (
    <Ionicons name="camera" size={34} color={props.focused ? 'grey' : 'darkgrey'}/>
)
const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default class ScannerScreen extends React.Component{
    static navigationOptions = {
        tabBarIcon: TabIcon
    };

    camera = null;
    constructor(props){
        super(props);
        this.state = {
            hasCameraPermission: null,
            hasPreview: false,
            capturedImage: null,
            cameraType: 'back',
        };
        this.savePicture.bind(this);
        this.switchCamera.bind(this);
    }
    

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const hasCameraPermission = (camera.status === 'granted');
        this.setState({ hasCameraPermission });
    };

    async savePicture(){
        if (!camera) return
        const photo = await camera.takePictureAsync()
        console.log(photo)
        this.setState({hasPreview: true});
        this.setState({capturedImage: photo});
    }

    switchCamera(){
        if (this.state.cameraType === 'back') {
            this.setState({cameraType: 'front'})
        } else {
            this.setState({cameraType: 'back'})
        }
    }

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <View>
                <Camera
                    style={styles.preview}
                    ref={camera => this.camera = camera}
                    type={this.state.cameraType}
                />
                <TouchableOpacity
                    onPress={this.savePicture}
                    style={{
                        borderRadius: 4,
                        backgroundColor: '#14274e',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Feather
                        name = "circle"
                        color="white"
                        size={24}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.switchCamera()}
                    style={{
                        borderRadius: 4,
                        backgroundColor: '#14274e',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Ionicons
                        name="camera-reverse-outline"
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
        );
    };
}


const styles = StyleSheet.create({
    preview: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
});