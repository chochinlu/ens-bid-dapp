import React from 'react';
import {FormControl} from 'material-ui/Form';
import Button from 'material-ui/Button';
import Input, {InputLabel} from 'material-ui/Input';

export const PrivateKeyForm = (props) => {
  const disabled = (props.privateKey.length === 64 || 
    (props.privateKey.startsWith('0x') && props.privateKey.length === 66)) ? false : true;
  
  return (
    <FormControl className="KeystoreUploader-formcontrol">
      <InputLabel
        htmlFor='privateKey'
        children='Enter private key to unlock the wallet'/>
      <Input
        type='text'
        className="input-secret"
        fullWidth={true}
        id='privateKey'
        autoFocus={true}
        value={props.privateKey}
        onChange={props.handlePrivateKeyChange}/>
      <div className="KeystoreUploader-button-container">
        <Button 
          raised 
          disabled={disabled}
          onClick={props.savePrivateKey}>
          Unlock
        </Button>
      </div>
    </FormControl>
  );
};
