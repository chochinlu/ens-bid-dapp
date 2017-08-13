import React, { Component } from 'react';
import logo from './logo.png';
import BlockNumber from './components/BlockNumber';
import AddressSearch from './components/AddressSearch';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>ENS Bid Dapp</h2>
        </div>
        <BlockNumber />
        <AddressSearch />
      </div>
    );
  }
}

export default App;
