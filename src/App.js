import React, {Component} from 'react';
import {MainWrapper} from './components/MainWrapper';
import Warnings from './components/Warnings';
import Top from './components/Top/Top';
import Footer from './components/Footer/Footer';
import {getAddressBalance} from './lib/dAppService';
import 'typeface-roboto';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      balance: '',
      source: 'keystore',
      page: 'main'
    };
    this.setAccount = this.setAccount.bind(this);
    this.setEmptyAccount = this.setEmptyAccount.bind(this);
    this.setSource = this.setSource.bind(this);
    this.switchPage = this.switchPage.bind(this);
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

  switchPage(page) {
    this.setState({page});
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
          ? <MainWrapper
              {...this.state}
              switchPage={this.switchPage}
            />
          : <Warnings/>}
        <Footer/>
      </div>
    );
  }
}

export default App;
