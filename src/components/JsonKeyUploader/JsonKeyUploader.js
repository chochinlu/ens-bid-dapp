import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
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

  onDrop(files) {
    const file = files[0];
    // console.log(file);

    const self = this;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target.result;
      const base64data = result.split(',')[1];
      const jsonStr = atob(base64data);
      // console.log(jsonStr);

      //TODO: fetch the private key via the ethereumjs-wallet

      self.setState({ 
        files,
        dragDiabled: true,
        keystore: JSON.parse(jsonStr)
      });
    };
    reader.readAsDataURL(file);
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
            accept='application/json' 
            multiple={false} 
            onDrop={this.onDrop}>
            {dropMsg}
          </Dropzone>
        </div>
        {uploadInfo}
      </div>
    );
  }
}