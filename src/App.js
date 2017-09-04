import React, { Component } from 'react';
import {Dapp} from './components/Dapp';
import Warnings from './components/Warnings';
import DappBar from './components/DappBar';
import 'typeface-roboto';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: ''
    };
    this.setAccount = this.setAccount.bind(this);
  }

  setAccount(account) {
    this.setState({account});
  }

  render() {
    return (
      <div className="App">
        <DappBar setAccount={this.setAccount} account={this.state.account} />
        { process.env.REACT_APP_PROVIDER 
          ? <Dapp /> 
          : <Warnings /> }
      </div>
    );
  }
}

export default App;
