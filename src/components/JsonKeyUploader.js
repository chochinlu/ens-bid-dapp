import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import './JsonKeyUploader.css';

//TODO: determine if is a valid json file
//TODO: analyze json file

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
    this.setState({ 
      files,
      dragDiabled: true
    });
  }

  enableDrag() {
    this.setState({dragDiabled: false});
  }

  render() {
    const dropMsg = this.state.dragDiabled
      ? <p>You've uploaded a key file: </p>
      : <p>Drop your KEY FILE here. (JSON file only)</p>;
    
    const style = this.state.dragDiabled
      ? classNames('dropzone', 'dropzone-disable')
      : classNames('dropzone', 'dropzone-enable');

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