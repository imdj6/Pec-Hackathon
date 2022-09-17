import { initializeApp } from '@firebase/app';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAypYK03jWntHQZokfTXjp5EUVRwfA33dA",
    authDomain: "doddle-drive.firebaseapp.com",
    projectId: "doddle-drive",
    storageBucket: "doddle-drive.appspot.com",
    messagingSenderId: "387310835629",
    appId: "1:387310835629:web:bbe2c484bcf1a2ceac7324",
    measurementId: "G-Y2NLBG0W88"
};

const app=firebase.initializeApp(firebaseConfig);
const db=app.firestore();
const auth=firebase.auth();

export {db,auth};
