import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home';
import RoomDescription from './pages/RoomDescription';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/book/:roomId" component={RoomDescription} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
