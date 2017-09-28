import React, {Component} from 'react';
import {Dapp} from './components/Dapp';
import Warnings from './components/Warnings';
import Top from './components/Top/Top';
import {getAddressBalance} from './lib/dAppService';
import 'typeface-roboto';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      balance: '',
      source: 'metamask'
    };
    this.setAccount = this.setAccount.bind(this);
    this.setEmptyAccount = this.setEmptyAccount.bind(this);
    this.setSource = this.setSource.bind(this);
  }

  setSource(type) {
    this.setState({source: type});
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
        <Top
          {...this.state}
          setAccount={this.setAccount}
          setEmptyAccount={this.setEmptyAccount}
          setSource={this.setSource}
        /> 
        {process.env.REACT_APP_PROVIDER
          ? <Dapp/>
          : <Warnings/>}
      </div>
    );
  }
}

export default App;
