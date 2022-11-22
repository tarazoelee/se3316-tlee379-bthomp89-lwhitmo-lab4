//set up firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const app = firebase.initializeApp({
  apiKey: "AIzaSyDAyEuEezG0UcCsPmTSTbRsczQkvL6LKBc",
  authDomain: "lab4-4c879.firebaseapp.com",
  projectId: "lab4-4c879",
  storageBucket: "lab4-4c879.appspot.com",
  messagingSenderId: "382355225981",
  appId: "1:382355225981:web:7816edf99ab82c1526e014",
  measurementId: "G-8WBYCGVXEE"
})

if (!firebase.apps.length) {
  firebase.initializeApp({});
}else {
  firebase.app(); // if already initialized, use that one
}
// firebase.initializeApp(app); //initialize firebase app 
// module.exports = { firebase };
export const auth = app.auth();
export default app;
