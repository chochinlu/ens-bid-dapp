import React, { Component } from 'react';
import {Dapp} from './components/Dapp';
import Warnings from './components/Warnings';
import DappBar from './components/DappBar';
import {Hero} from './components/Hero';
import 'typeface-roboto';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DappBar />
        <Hero />
        { process.env.REACT_APP_PROVIDER 
          ? <Dapp /> 
          : <Warnings /> }
      </div>
    );
  }
}

export default App;
