import React, {Component} from 'react';
import {MainWrapper} from './MainWrapper/MainWrapper';
import Warnings from './Warnings';
import Top from './Top/Top';
import Footer from './Footer/Footer';
import {FAQ} from './FAQ/FAQ';
import {Disclaimer} from './Disclaimer/Disclaimer';
import {getAddressBalance} from '../lib/dAppService';
import {entries} from '../lib/ensService';
import * as labels from '../constants/menu';
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
      walletOpen: false,
      walletWarningMessage: '',

      menuLabel: labels.ENS_BID
    };

    this.setAddressAndBalance = this.setAddressAndBalance.bind(this);
    this.setSource = this.setSource.bind(this);
    this.switchPage = this.switchPage.bind(this);
    this.setKeystore = this.setKeystore.bind(this);
    this.setPrivateKey = this.setPrivateKey.bind(this);
    
    // for handling search
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
    this.handleSearchKeyDown = this.handleSearchKeyDown.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleMessageOpen = this.handleMessageOpen.bind(this);
    this.handleMessageClose = this.handleMessageClose.bind(this);
    this.handleWalletWarningMsg = this.handleWalletWarningMsg.bind(this);
    this.backToSearch = this.backToSearch.bind(this);

    // unlock wallet
    this.handleOpenWallet = this.handleOpenWallet.bind(this);
    this.handleCloseWallet = this.handleCloseWallet.bind(this);
    
    this.menuSwitch = this.menuSwitch.bind(this);
  }

  // unlock wallet
  handleOpenWallet() {
    this.setState({walletOpen: true});
  }

  handleWalletWarningMsg(msg) {
    this.setState({walletWarningMessage: msg})
  }
  
  handleCloseWallet() {
    this.setState({
      walletWarningMessage: null,
      walletOpen: false
    });
  }

  handleSearchChange(e) {
    this.setState({searchValue: e.target.value});
  }

  handleSearchKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSearchClick(e);
    } else {
      this.setState({ searchResult: null });
    }
  }

  handleSearchKeyDown(e) {
    if (e.keyCode === 27) {
      this.setState({ searchValue: '', searchResult: null});
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

  setAddressAndBalance(address) {
    const balance = getAddressBalance(address);
    this.setState({
      address: address,
      balance: balance
    });
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

  menuSwitch(menuLabel) {
    this.setState({menuLabel});
  }

  handleMenuSwitch() {
    switch(this.state.menuLabel) {
      case labels.ENS_BID:
        return this.mainWrapperPage();
      case labels.FAQ:
        return this.faqPage();
      case labels.DISCLAIMER:
        return this.disclaimerPage();
      case labels.BUG_REPORT:
        return this.bugReportPage();
      default:
        return this.mainWrapperPage();;
    }
  }

  faqPage() {
    return <FAQ/>;
  }

  disclaimerPage() {
    return <Disclaimer/>;
  }

  bugReportPage() {
    window.location.href="https://github.com/ens-bid/ens-bid-dapp/issues";
  }

  mainWrapperPage() {
    return process.env.REACT_APP_PROVIDER
    ? <MainWrapper
        className="App-content"
        {...this.state}
        switchPage={this.switchPage}
        handleSearchChange={this.handleSearchChange}
        handleSearchClick={this.handleSearchClick}
        handleSearchKeyPress={this.handleSearchKeyPress}
        handleSearchKeyDown={this.handleSearchKeyDown}
        backToSearch={this.backToSearch}
        handleMessageOpen={this.handleMessageOpen}
        handleMessageClose={this.handleMessageClose}
        handleOpenWallet={this.handleOpenWallet}
        handleCloseWallet={this.handleCloseWallet}
        handleWalletWarningMsg={this.handleWalletWarningMsg}
      />
    : <Warnings/>;
  }

  render() {
    const showPage = this.handleMenuSwitch();
    
    return (
      <div className="App">
        <Top
          {...this.state}
          menuSwitch={this.menuSwitch}
          switchPage={this.switchPage}
          setAddressAndBalance={this.setAddressAndBalance}
          setSource={this.setSource}
          setKeystore={this.setKeystore}
          setPrivateKey={this.setPrivateKey}
          backToSearch={this.backToSearch}
          handleOpenWallet={this.handleOpenWallet}
          handleCloseWallet={this.handleCloseWallet}
        /> 
        {showPage}
        <Footer/>
      </div>
    );
  }
}

export default App;
