import React, { Component } from 'react';
import logo from './logo.png';
import {Dapp} from './components/Dapp';
import Warnings from './components/Warnings';
import DappBar from './components/DappBar';
import 'typeface-roboto';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DappBar />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        { process.env.REACT_APP_PROVIDER 
          ? <Dapp /> 
          : <Warnings /> }
      </div>
    );
  }
}

export default App;
