import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import {isValidJsonString} from '../../lib/util';
import './JsonKeyUploader.css';

export class JsonKeyUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      dragDiabled: false
    };
    this.onDrop = this.onDrop.bind(this);
    this.enableDrag = this.enableDrag.bind(this);
  }

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
    this.setState({dragDiabled: false});
  }

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
      <div className='JsonKeyUploader'>
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
      </div>
    );
  }
}