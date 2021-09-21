import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './App.css';
import NavBar from './components/NavBar/NavBar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import RoomDescription from './pages/RoomDescription';

function App() {
 
  return (
    <div className="App">
      <Router>
      <NavBar  />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/book/:roomId/:fromDate/:toDate" component={RoomDescription} exact />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
