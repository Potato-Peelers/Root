import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAvE-9OKB-jXaWMojhGCqQEFbRSftMaoqk',
    authDomain: 'metrohacksapp.firebaseapp.com',
    databaseURL: 'https://metrohacksapp.firebaseio.com',
    projectId: 'metrohacksapp',
    storageBucket: 'metrohacksapp.appspot.com',
    messagingSenderId: '776338097539',
    appId: '1:776338097539:ios:1a13008514611855b022b6',
};

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}
export { firebase };