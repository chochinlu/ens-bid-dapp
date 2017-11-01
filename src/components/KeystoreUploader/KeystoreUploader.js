import React, {Component} from 'react';
import {isValidJsonString} from '../../lib/util';
import Card from 'material-ui/Card';
import {getPrivateKey, validAddress} from '../../lib/dAppService';
import {JsonDropZone} from './JsonDropZone';
import {CurrentWallet} from './CurrentWallet';
import {PassphraseForm} from './PassphraseForm';
import './KeystoreUploader.css';

export class KeystoreUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      dragDisabled: false,
      unlock: false,
      passpharse: '',
      message: null
    };
    this.onDrop = this.onDrop.bind(this);
    this.enableDrag = this.enableDrag.bind(this);
    this.unlockWallet = this.unlockWallet.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.buttonSubmitDisabled = this.buttonSubmitDisabled.bind(this);
  }

  componentDidMount() {
    this.setState({message: this.props.walletWarningMessage});
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
          self.setState({
            files,
            dragDisabled: true,
            keystore,
            message: ''
          });

          const address = validAddress(keystore.address);
          this.props.setAddress(address);
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
    this.setState({ dragDisabled: false });
  }

  buttonSubmitDisabled = () => {
    return !(this.state.keystore && this.state.passpharse);
  }

  unlockWallet() {
    try {
      const privateKey = getPrivateKey(this.state.keystore, this.state.passpharse);
      this.props.setKeystore(this.state.keystore);
      this.props.setPrivateKey(privateKey);
      this.props.handleRequestClose();
    } catch(err) {
      console.log("err", err);
    }
  }

  handleChange = event => {
    this.setState({ passpharse: event.target.value });
  };

  render() {    
    const msg = this.state.message && 
      <p className='errMsg'>{this.state.message}</p>;

    const title = this.props.privateKey === "" ?
      <h2>Unlock Wallet</h2> : 
      <h2>Unlock Another Wallet</h2>;

    const accountInfo = this.state.keystore && 
      <p className="KeystoreUploader-accountInfo">
        <span>Current Address: </span>
        <span>{validAddress(this.state.keystore.address)}</span>
      </p>;

    return (
      <Card className='KeystoreUploader'>
        {msg}
        <CurrentWallet address={this.props.address} privateKey={this.props.privateKey} />
        {title}
        {accountInfo}
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