import React from 'react';
import './App.css';
import Login from './Login';
import showEvents from './showEvents';
import {Switch, Route} from 'react-router-dom';

class App extends React.Component {
  
  render() {
    return(
      <div>
        <Switch>
          <Route exact path = "/" component = {Login}/>
          <Route path = "/User/:user/Events" component = {showEvents}/>
        </Switch>
      </div>
    );
  }
}

export default App;