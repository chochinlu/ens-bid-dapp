import React, { Component } from 'react';
import logo from './logo.png';
import BlockNumber from './components/BlockNumber';
import AddressSearch from './components/AddressSearch';
import Warnings from './components/Warnings';
import './App.css';

class App extends Component {
  provider = 'undefined' !== process ? process.env.PROVIDER : null

  renderDappComponents() {
    return (
      <div>
        <BlockNumber />
        <AddressSearch />
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>ENS Bid Dapp</h2>
        </div>
        { !!this.provider ? this.renderDappComponents() : <Warnings /> }
      </div>
    );
  }
}

export default App;
