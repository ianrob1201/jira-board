import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './board/Table';
import {getSprint} from './jira/SprintLoader';

class App extends Component {
  constructor(props) {
    super(props);
    const issues = getSprint((issues) => {
      this.setState({
        issues
      });
    });

    this.state = {
      issues
    }
  }

  render() {
    return (
      <Table issues={this.state.issues}/>
    );
  }
}

export default App;
