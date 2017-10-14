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
      address: '',
      balance: '',
      source: 'keystore',
      page: 'main',
      keystore: '',
      privateKey: ''
    };
    this.setAddress = this.setAddress.bind(this);
    this.setSource = this.setSource.bind(this);
    this.switchPage = this.switchPage.bind(this);
    this.setKeystore = this.setKeystore.bind(this);
    this.setPrivateKey = this.setPrivateKey.bind(this);
  }

  setSource(type) {
    this.setState({source: type});
  }

  setAddress(address) {
    const balance = getAddressBalance(address);
    this.setState({address, balance});
  }

  setKeystore(keystore) {
    this.setState({keystore});
  }

  setPrivateKey(privateKey) {
    this.setState({privateKey});
  }

  switchPage(page) {
    this.setState({page});
  }

  render() {
    return (
      <div className="App">
        <Top
          {...this.state}
          setAddress={this.setAddress}
          setSource={this.setSource}
          setKeystore={this.setKeystore}
          setPrivateKey={this.setPrivateKey}
          switchPage={this.switchPage}
        /> 
        {process.env.REACT_APP_PROVIDER
          ? <MainWrapper
              className="App-content"
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
