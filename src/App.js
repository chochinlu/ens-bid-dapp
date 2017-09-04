import React, {Component} from 'react';
import {Dapp} from './components/Dapp';
import Warnings from './components/Warnings';
import DappBar from './components/DappBar';
import {getAddressBalance} from './lib/dAppService';
import 'typeface-roboto';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      balance: ''
    };
    this.setAccount = this.setAccount.bind(this);
    this.setEmptyAccount = this.setEmptyAccount.bind(this);
  }

  setAccount(account) {
    const balance = getAddressBalance(account);
    this.setState({account, balance});
  }

  setEmptyAccount() {
    this.setState({account: '', balance: ''});
  }

  render() {
    return (
      <div className="App">
        <DappBar
          account={this.state.account}
          balance={this.state.balance}
          setAccount={this.setAccount}
          setEmptyAccount={this.setEmptyAccount}
        /> 
        {process.env.REACT_APP_PROVIDER
          ? <Dapp/>
          : <Warnings/>}
      </div>
    );
  }
}

export default App;
