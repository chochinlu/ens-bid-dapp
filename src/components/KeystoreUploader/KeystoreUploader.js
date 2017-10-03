import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import {isValidJsonString} from '../../lib/util';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Card from 'material-ui/Card';

import './KeystoreUploader.css';

export class KeystoreUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      dragDiabled: false
    };
    this.onDrop = this.onDrop.bind(this);
    this.enableDrag = this.enableDrag.bind(this);
  }

  state = {
    password: 'Password',
  };

  validAddress(from) {
    return from.slice(0,2) === '0x' 
      ? from 
      : '0x' + from
  }

  onDrop(files) {
    const file = files[0];
    // console.log(file);

    //check file type 
    if (file.type !== 'application/json') {
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
        // console.log(jsonStr);

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
    this.setState({ dragDiabled: false });
  }

  handleChange = event => {
    this.setState({ password: event.target.value });
  };

  render() {    
    const dropMsg = this.state.dragDiabled
      ? <p>You've uploaded a key file: </p>
      : <p>Drop your KEY FILE here. (JSON file only)</p>;
    
    const style = classNames(
      'dropzone', 
      this.state.dragDiabled ? 'dropzone-disable': 'dropzone-enable'
    );

    const msg = this.state.message && 
      <p>{this.state.message}</p>;

    const accountInfo = this.state.keystore && 
      <p>Your address: {this.validAddress(this.state.keystore.address)}</p>

    const uploadInfo = this.state.files.length > 0 && 
      <div>
        <p>File uploaded: <strong>{this.state.files[0].name}</strong></p>
        {this.state.dragDiabled && 
          <button onClick={this.enableDrag}>ReUpload</button>}
      </div>;

    return (
      <Card className='KeystoreUploader'>
        <h2>Import Keystore</h2>
        <div>
          <Dropzone 
            className={style} 
            disabled={this.state.dragDiabled}
            multiple={false} 
            onDrop={this.onDrop}>
            {dropMsg}
          </Dropzone>
        </div>
        {msg}
        {accountInfo}
        {uploadInfo}
        <FormControl className="KeystoreUploader-formcontrol">
          <InputLabel htmlFor="password" children="Enter Password to unlock the wallet" />
          <Input
            type="password"
            className="input-secret" 
            fullWidth={true}
            id="password" value={this.state.name} onChange={this.handleChange} />
          <div className="KeystoreUploader-button-container">
            <Button raised className="KeystoreUploader-button">
              Unlock
            </Button>
          </div>
        </FormControl>
        
      </Card>
    );
  }
}