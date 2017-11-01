import React, {Component} from 'react';
import {MainWrapper} from './MainWrapper/MainWrapper';
import Warnings from './Warnings';
import Top from './Top/Top';
import Footer from './Footer/Footer';
import {getAddressBalance} from '../lib/dAppService';
import {entries} from '../lib/ensService';
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
      privateKey: '',
      
      // for handling search
      searchValue: '',
      searchResult: null,
      searchFetching: false,
      warningMessage: '',
      warningOpen: false,

      // open unlock wallet
      menuOpen: false,
      menuWarningMessage: ''
    };

    this.setAddress = this.setAddress.bind(this);
    this.setSource = this.setSource.bind(this);
    this.switchPage = this.switchPage.bind(this);
    this.setKeystore = this.setKeystore.bind(this);
    this.setPrivateKey = this.setPrivateKey.bind(this);
    
    // for handling search
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleMessageOpen = this.handleMessageOpen.bind(this);
    this.handleMessageClose = this.handleMessageClose.bind(this);
    this.backToSearch = this.backToSearch.bind(this);

    // unlock wallet
    this.handleOpenWallet = this.handleOpenWallet.bind(this);
    this.handleCloseWallet = this.handleCloseWallet.bind(this);
  }

  // unlock wallet
  handleOpenWallet() {
    let menuWarningMessage = '';
    if (!(this.props.address && this.props.privateKey)) {
      menuWarningMessage = 'Please login before bidding!';
    }
    this.setState({
      menuWarningMessage: menuWarningMessage,
      menuOpen: true
    });
  }
  
  handleCloseWallet() {
    this.setState({
      menuWarningMessage: null,
      menuOpen: false
    });
  }

  handleSearchChange(e) {
    this.setState({searchValue: e.target.value});
  }

  handleSearchKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSearchClick(e);
    }
  }

  handleSearchClick(e) {
    e.preventDefault();

    if ((this.state.searchValue).length < 7) {
      this.handleMessageOpen('ENS .eth should greater than 7 words');
      return;
    }

    if (this.state.searchValue) {
      this.setState({fetching: true}); //TODO: not work
      const searchResult = entries(this.state.searchValue);
      searchResult.searchName = this.state.searchValue;
      this.setState({searchResult, searchFetching: false});
    }
  }

  backToSearch() {
    this.setState({
      page: 'main',
      searchValue: null,
      searchResult: null
    });
  }

  handleMessageOpen = msg => this.setState({warningOpen: true, warningMessage: msg});
  handleMessageClose = () => this.setState({warningOpen: false});

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
    const mainWrapperOrWarning = process.env.REACT_APP_PROVIDER
      ? <MainWrapper
          className="App-content"
          {...this.state}
          switchPage={this.switchPage}
          handleSearchChange={this.handleSearchChange}
          handleSearchClick={this.handleSearchClick}
          handleSearchKeyPress={this.handleSearchKeyPress}
          backToSearch={this.backToSearch}
          handleMessageOpen={this.handleMessageOpen}
          handleMessageClose={this.handleMessageClose}
          handleOpenWallet={this.handleOpenWallet}
          handleCloseWallet={this.handleCloseWallet}
        />
      : <Warnings/>;
    
    return (
      <div className="App">
        <Top
          {...this.state}
          setAddress={this.setAddress}
          setSource={this.setSource}
          setKeystore={this.setKeystore}
          setPrivateKey={this.setPrivateKey}
          backToSearch={this.backToSearch}
          handleOpenWallet={this.handleOpenWallet}
          handleCloseWallet={this.handleCloseWallet}
        /> 
        {mainWrapperOrWarning}
        <Footer/>
      </div>
    );
  }
}

export default App;
