// Import the functions you need from the SDKs you need
import * as Firebase from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDzJI61j4iJKF1dpS9twunLl4YDLUdbEwM",
  authDomain: "last-don.firebaseapp.com",
  projectId: "last-don",
  storageBucket: "last-don.appspot.com",
  messagingSenderId: "591522522445",
  appId: "1:591522522445:web:517df09939d3cfe59e4304",
  measurementId: "G-G5TNY3GDYX"
};

// Initialize Firebase
if(!Firebase.getApps().length){
  Firebase.initializeApp(firebaseConfig)
}
