import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCE-DRbKA51vbgvc7PjycALF6WjU8BZz2I",
  authDomain: "chat-app-cbd41.firebaseapp.com",
  databaseURL: "https://chat-app-cbd41.firebaseio.com",
  projectId: "chat-app-cbd41",
  storageBucket: "chat-app-cbd41.appspot.com",
  messagingSenderId: "574908845646",
  appId: "1:574908845646:web:ef4f20b8c6fa7bafa9fd1f",
  measurementId: "G-KEK6MHJWG2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


