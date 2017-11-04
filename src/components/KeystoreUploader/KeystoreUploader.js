import React, {Component} from 'react';
import {isValidJsonString, validAddress} from '../../lib/util';
import Card from 'material-ui/Card';
import {getPrivateKey} from '../../lib/dAppService';
import {Warnings} from '../Common/Warnings';
import {JsonDropZone} from './JsonDropZone';
import {CurrentWallet} from './CurrentWallet';
import {PassphraseForm} from './PassphraseForm';
import './KeystoreUploader.css';

const Notice = () => (
  <p className="notice">
    <span>Notice:</span>
    <span>
      ENS.BID does not hold your keys for you. 
      We cannot access accounts, recover keys, reset passwords, nor reverse transactions. 
      Protect your keys & always check that you are on correct URL. You are responsible for your security.
    </span>
  </p>
);

const ErrMsg = (props) => (
  <div className='errMsg'>
    <i className="material-icons">info</i>
    <p>{props.children}</p>
  </div>
);

export class KeystoreUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      dragDisabled: false,
      unlock: false,
      passpharse: '',
      message: null,
      olderAddress: '',
      olderBalance: '',
      currentAddress: '',
      warningOpen: false,
      warningMessage: '',
    };
    this.onDrop = this.onDrop.bind(this);
    this.enableDrag = this.enableDrag.bind(this);
    this.unlockWallet = this.unlockWallet.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.buttonSubmitDisabled = this.buttonSubmitDisabled.bind(this);
    this.handleWarningMessageClose = this.handleWarningMessageClose.bind(this);
    this.handleWarningMessageOpen = this.handleWarningMessageOpen.bind(this);
  }

  componentDidMount() {
    this.setState({message: this.props.walletWarningMessage});
  }

  handleWarningMessageClose() {
    this.setState({warningOpen: false});
  }

  handleWarningMessageOpen(msg) {
    this.setState({warningOpen: true, warningMessage: msg});
  }

  onDrop(files) {
    const file = files[0];
    
    //check file type 
    if (file.type !== 'application/json' && file.type !== '') {
      this.setState({
        message: 'Please upload a valid JSON file.'
      });
    } else {
      const self = this;

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target.result;
        const base64data = result.split(',')[1];
        const jsonStr = atob(base64data);

        const keystore = JSON.parse(jsonStr);
        if (isValidJsonString(jsonStr)) {
          const olderAddress = self.props.address;
          const olderBalance = self.props.balance;
          const currentAddress = validAddress(keystore.address);

          self.setState({
            files,
            dragDisabled: true,
            message: '',
            keystore,
            olderAddress,
            olderBalance,
            currentAddress
          });
        } else {
          self.setState({
            message: 'Please upload a valid JSON file.'
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  enableDrag() {
    this.setState({ dragDisabled: false, passpharse: '' });
  }

  buttonSubmitDisabled = () => {
    return !(this.state.keystore && this.state.passpharse);
  }

  unlockWallet() {
    try {
      const privateKey = getPrivateKey(this.state.keystore, this.state.passpharse);
      this.props.setAddressAndBalance(this.state.currentAddress);
      this.props.setKeystore(this.state.keystore);
      this.props.setPrivateKey(privateKey);
      this.props.handleRequestClose();
    } catch(err) {
      this.handleWarningMessageOpen(err.message);
    }
  }

  handleChange = event => {
    this.setState({ passpharse: event.target.value });
  };

  render() {    
    const msg = this.state.message && 
      <ErrMsg>{this.state.message}</ErrMsg>;
    
    const currentWallet = 
      this.props.privateKey && (
        <CurrentWallet
          address={this.props.address}
          balance={this.props.balance} />
      );

    const title = this.props.privateKey === "" ?
      <h2>Unlock Wallet</h2> : 
      <h2>Unlock Another Wallet</h2>;

    const accountInfo =
     this.state.currentAddress &&
      <p className="KeystoreUploader-accountInfo">
        <span>Current Address: </span>
        {validAddress(this.state.currentAddress)}
      </p>;

    const warning = 
      <Warnings
        warningOpen={this.state.warningOpen}
        warningMessage={this.state.warningMessage}
        handleWarningMessageClose={this.handleWarningMessageClose}
      />  

    return (
      <Card className='KeystoreUploader'>
        {msg}
        <Notice />
        {currentWallet}
        {title}
        {accountInfo}
        {warning}
        <JsonDropZone 
          dragDisabled={this.state.dragDisabled}
          onDrop={this.onDrop}
        />
        <PassphraseForm
          keystore={this.state.keystore}
          passpharse={this.state.passpharse}
          handleChange={this.handleChange}
          dragDisabled={this.state.dragDisabled}
          enableDrag={this.enableDrag}
          unlockWallet={this.unlockWallet}
          buttonSubmitDisabled={this.buttonSubmitDisabled()}
        />
      </Card>
    );
  }
}