import React, { Component } from 'react';
import logo from './logo.png';
import {Dapp} from './components/Dapp';
import Warnings from './components/Warnings';
import SearchBar from './components/SearchBar';
import './App.css';

class App extends Component {
  render() {
    // console.log(process.env);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>ENS Bid Dapp</h2>
        </div>
        { process.env.REACT_APP_PROVIDER 
          ? <Dapp /> 
          : <Warnings /> }
      </div>
    );
  }
}

export default App;
