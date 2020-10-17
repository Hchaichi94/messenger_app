import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase'
import { Provider } from 'react-redux'
import store from './store'

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
firebase.initializeApp(firebaseConfig);

window.store=store

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);


