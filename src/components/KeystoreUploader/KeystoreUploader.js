import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import {isValidJsonString} from '../../lib/util';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Card from 'material-ui/Card';
import {getPrivateKeyFromV3} from '../../lib/dAppService';

import './KeystoreUploader.css';

export class KeystoreUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      dragDiabled: false,
      unlock: false,
    };
    this.onDrop = this.onDrop.bind(this);
    this.enableDrag = this.enableDrag.bind(this);
    this.unlockWallet = this.unlockWallet.bind(this);
  }

  state = {
    passpharse: 'Passphrase',
  };

  validAddress(from) {
    return from.slice(0,2) === '0x' 
      ? from 
      : '0x' + from
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

          const address = this.validAddress(keystore.address);
          this.props.setAccount(address);
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
    this.setState({ dragDiabled: false, keystore: '', name: '' });
  }

  unlockWallet() {
    try {
      const privateKey = getPrivateKeyFromV3(this.state.keystore, this.state.passpharse);
      this.props.setKeystore(this.state.keystore);
      this.props.setPrivateKey(privateKey);
    } catch(err) {
      // TODO show exception using snackbars
      console.log("err", err);
    }
  }

  handleChange = event => {
    this.setState({ passpharse: event.target.value });
  };

  render() {    
    const dropMsg = <p className="dropzone-message">Drop your KEY FILE here. (JSON file only)</p>;

    const style = classNames(
      'dropzone', 
      this.state.dragDiabled ? 'dropzone-disable': 'dropzone-enable'
    );

    const dropzone = !this.state.dragDiabled && 
    <Dropzone 
      className={style} 
      disabled={this.state.dragDiabled}
      multiple={false} 
      onDrop={this.onDrop}>
      {dropMsg}
    </Dropzone>
    
    // TODO using snackbars handle message
    const msg = this.state.message && 
      <p>{this.state.message}</p>;

    const accountInfo = this.state.keystore && 
      <p>Address: {this.validAddress(this.state.keystore.address)}</p>

    const uploadInfo = this.state.files.length > 0 && this.state.keystore && 
      <div>
        <p>File name: <strong>{this.state.files[0].name}</strong></p>
      </div>;

    const passphraseDisabled = this.state.keystore ? "" : "disabled";

    const reUpload = this.state.dragDiabled &&
      <Button raised className="KeystoreUploader-button-reupload" onClick={this.enableDrag}>Reupload</Button>

    const show = this.state.keystore ? true : false;

    return (
      <Card className='KeystoreUploader'>
        <h2>Import Keystore</h2>
        {msg}
        {dropzone}
        {accountInfo}
        <FormControl className="KeystoreUploader-formcontrol">
          <InputLabel htmlFor="passphrase" 
            children="Enter passphrase to unlock the wallet" 
            shrink={show} 
            focused={show}/>
          <Input
            type="password"
            className="input-secret" 
            fullWidth={true}
            id="password" 
            autoFocus={true}
            value={this.state.name} 
            onChange={this.handleChange} 
            disabled={passphraseDisabled}/>
          <div className="KeystoreUploader-button-container">
            {reUpload}
            <Button 
              raised 
              className="KeystoreUploader-button" 
              onClick={this.unlockWallet}>
              Unlock
            </Button>
          </div>
        </FormControl>
      </Card>
    );
  }
}