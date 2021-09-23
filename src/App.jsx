
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './App.css';
import NavBar from './components/NavBar/NavBar';
import NotFound from './components/NotFound/NotFound';
import AllBookings from './pages/Admin/AllBookings';
import AllRooms from './pages/Admin/AllRooms';
import AllUsers from './pages/Admin/AllUsers';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import RoomDescription from './pages/RoomDescription';

function App() {
  const user = JSON.parse(localStorage.getItem('hotel_user'))
 
  return (
    <div className="App">
      <Router>
      <NavBar  />
        <Switch>
          <Route exact  path="/" component={Home}  />
          <Route exact  path="/login" component={Login} />
          <Route exact  path="/register" component={Register}/>
          <Route exact  path="/profile" component={Profile} />
          <Route exact  path="/bookings" component={user?.token? Profile:Login} />
          <Route exact  path="/all-bookings" component={user?.token ? user?.isAdmin ?  AllBookings: Home:Login } />
          <Route exact  path="/all-rooms" component={user?.token ? user?.isAdmin ?  AllRooms: Home:Login } />
          <Route exact  path="/all-users" component={user?.token ? user?.isAdmin ?  AllUsers: Home:Login } />
          <Route  exact path="/book/:roomId/:fromDate/:toDate" component={RoomDescription}  />
          <Route  exact  component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
