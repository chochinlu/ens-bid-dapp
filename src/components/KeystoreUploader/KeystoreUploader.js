import React, {Component} from 'react';
import {isValidJsonString, validAddress} from '../../lib/util';
import Card from 'material-ui/Card';
import Button from 'material-ui/Button';
// import TextField from 'material-ui/TextField';
import {getPrivateKey, getAddressByPrivateKey} from '../../lib/dAppService';
import {Warnings} from '../Common/Warnings';
import {JsonDropZone} from './JsonDropZone';
import {CurrentWallet} from './CurrentWallet';
import {PassphraseForm} from './PassphraseForm';
import {PrivateKeyForm} from './PrivateKeyForm';
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

/* TODO refactor
const actions = [
  {icon: 'file_upload', name: 'Keystore File', disabled: false, label: 'KeystoreFile'},
  {icon: 'vpn_key', name: 'Private Key', disabled: false, label: 'PrivateKey'},
]

const UnlockActionButton = (props) => {
  <Button raised 
    color="default"
    disabled={(props.unlockAction === props.label) ? "disabled" : ""} 
    onClick={() => props.handleUnlockActionClick('KeystoreFile')}>
    <i class="material-icons">{props.icon}</i>
    {props.children}
  </Button>
}*/

const UnlockActions = (props) => (
  <div className="unlock-actions">
    <Button raised 
      color="default" 
      disabled={(props.unlockAction === 'KeystoreFile') ? true : false}
      onClick={() => props.handleUnlockActionClick('KeystoreFile')}>
      <i className="material-icons">file_upload</i>
      Keystore File
    </Button>
    <Button raised 
      color="default" 
      disabled={(props.unlockAction === 'PrivateKey') ? true : false}
      onClick={() => props.handleUnlockActionClick('PrivateKey')}>
      <i className="material-icons">vpn_key</i>
      Private Key
    </Button>
  </div>
);

// For Mobile. 
// In some mobile devices, we just can only copy/paste the keystore json file
// const InputTable = (props) => (
//   <div className='input-table'>
//     <TextField
//       multiline={true}
//       rows={3}
//       onChange={props.handleTextFieldChange}
//     />
//   </div>
// );

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
      unlockAction: 'KeystoreFile',
      privateKey: '',
    };
    this.onDrop = this.onDrop.bind(this);
    this.enableDrag = this.enableDrag.bind(this);
    this.unlockWallet = this.unlockWallet.bind(this);
    this.savePrivateKey = this.savePrivateKey.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePrivateKeyChange = this.handlePrivateKeyChange.bind(this);
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

  savePrivateKey() {
    try {
      const privateKey = (this.state.privateKey.startsWith('0x')) ? 
        this.state.privateKey.substring(2) : this.state.privateKey;
      const currentAddress = getAddressByPrivateKey(privateKey);
      this.setState({currentAddress});
      this.props.setAddressAndBalance(currentAddress);
      this.props.setPrivateKey(privateKey);
      this.props.handleRequestClose();
    } catch(err) {
      console.log("error", err);
      this.handleWarningMessageOpen(err.message);
    }
  }

  handleUnlockActionClick = unlockAction => {
    this.setState({unlockAction});
  }

  handleChange = event => {
    this.setState({ passpharse: event.target.value });
  };

  handlePrivateKeyChange = event => {
    this.setState({ privateKey: event.target.value });
  }

  // handleTextFieldChange = (event) => {
  //   event.preventDefault();
  //   const self = this;
  //   const jsonStr = event.target.value;
  //   if (isValidJsonString(jsonStr)) {
  //     const keystore = JSON.parse(event.target.value);
  //     const olderAddress = self.props.address;
  //     const olderBalance = self.props.balance;
  //     const currentAddress = validAddress(keystore.address);

  //     self.setState({
  //       dragDisabled: true,
  //       message: '',
  //       keystore,
  //       olderAddress,
  //       olderBalance,
  //       currentAddress
  //     });
  //     console.log(keystore)
  //   } else {
  //     self.setState({
  //       message: 'Please paste a valid JSON file.'
  //     });
  //   }
  // }

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

    const unlockActions = 
      <UnlockActions 
        unlockAction={this.state.unlockAction} 
        handleUnlockActionClick={this.handleUnlockActionClick}
      />;

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

    const keystoreUpload = this.state.unlockAction === 'KeystoreFile' &&
      <JsonDropZone
        dragDisabled={this.state.dragDisabled}
        onDrop={this.onDrop}
      />;
    
    const passphraseForm = this.state.unlockAction === 'KeystoreFile' &&
      <PassphraseForm
        keystore={this.state.keystore}
        passpharse={this.state.passpharse}
        handleChange={this.handleChange}
        dragDisabled={this.state.dragDisabled}
        enableDrag={this.enableDrag}
        unlockWallet={this.unlockWallet}
        buttonSubmitDisabled={this.buttonSubmitDisabled()}
      />;

    const privateKeyForm = this.state.unlockAction === 'PrivateKey' &&
      <PrivateKeyForm
        privateKey={this.state.privateKey}
        handlePrivateKeyChange={this.handlePrivateKeyChange}
        savePrivateKey={this.savePrivateKey}
      />

    return (
      <Card className='KeystoreUploader'>
        {msg}
        <Notice />
        {currentWallet}
        {title}
        {unlockActions}
        {accountInfo}
        {warning}
        {keystoreUpload}
        {passphraseForm}
        {privateKeyForm}
      </Card>
    );
  }
}