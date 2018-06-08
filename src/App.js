import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './board/Table';
import Picker from './picker/Picker';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <main>
          <Switch>
            <Route exact path="/board" component={Table}/>
            <Route exact path="/" component={Picker}/>
            <Route exact path="/picker" component={Picker}/>
          </Switch>
        </main>
    );
  }
}

export default App;
