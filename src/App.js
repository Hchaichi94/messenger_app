import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import HomePage from './containers/HomePage'
import LoginPage from './containers/LoginPage'
import RegisterPage from './containers/RegisterPage'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <div className="App">
      <Router>
        <PrivateRoute path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={RegisterPage} />
      </Router>
    </div>
  );
}

export default App;
