import React, {Component} from 'react';
import {isValidJsonString} from '../../lib/util';
import Card from 'material-ui/Card';
import {getPrivateKeyFromV3, validAddress} from '../../lib/dAppService';
import {JsonDropZone} from './JsonDropZone';
import {CurrentWallet} from './CurrentWallet';
import {PassphraseForm} from './PassphraseForm';
import './KeystoreUploader.css';

export class KeystoreUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      dragDiabled: false,
      unlock: false,
      passpharse: ''
    };
    this.onDrop = this.onDrop.bind(this);
    this.enableDrag = this.enableDrag.bind(this);
    this.unlockWallet = this.unlockWallet.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
            dragDiabled: true,
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
    // this.setState({ dragDiabled: false, keystore: '', passpharse: '' });
    this.setState({ dragDiabled: false });
  }

  unlockWallet() {
    try {
      const privateKey = getPrivateKeyFromV3(this.state.keystore, this.state.passpharse);
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
      <p>{this.state.message}</p>;

    const title = this.props.privateKey === "" ?
      <h2>Unlock Wallet</h2> : 
      <h2>Unlock Another Wallet</h2>;

    const accountInfo = this.state.keystore && 
      <p>Current Address: {validAddress(this.state.keystore.address)}</p>

    return (
      <Card className='KeystoreUploader'>
        {msg}
        <CurrentWallet address={this.props.address} privateKey={this.props.privateKey} />
        {title}
        {accountInfo}
        <JsonDropZone 
          dragDiabled={this.state.dragDiabled}
          onDrop={this.onDrop}
        />
        <PassphraseForm
          keystore={this.state.keystore}
          passpharse={this.state.passpharse}
          handleChange={this.handleChange}
          dragDiabled={this.state.dragDiabled}
          enableDrag={this.enableDrag}
          unlockWallet={this.unlockWallet}
        />
      </Card>
    );
  }
}