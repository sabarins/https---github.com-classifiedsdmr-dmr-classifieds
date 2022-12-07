// import firebase from 'firebase';
import { initializeApp } from "firebase/app";

const firebaseConfig  = 
{
    apiKey: "AIzaSyDa7k_qOQIbkzCKLscz7pFQ0IXrvO8Vhc0",
    authDomain: "verify-cff2c.firebaseapp.com",
    projectId: "verify-cff2c",
    storageBucket: "verify-cff2c.appspot.com",
    messagingSenderId: "533271465845",
    appId: "1:533271465845:web:719004a4d1ecb58e568d3c"
};

const app = initializeApp(firebaseConfig);


export default app;