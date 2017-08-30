import React, { Component } from 'react';
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
        { process.env.REACT_APP_PROVIDER 
          ? <Dapp /> 
          : <Warnings /> }
      </div>
    );
  }
}

export default App;
