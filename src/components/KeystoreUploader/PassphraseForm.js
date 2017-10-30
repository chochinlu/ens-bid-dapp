import React from 'react';
import {FormControl} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import {Actions} from './Actions';

export const PassphraseForm = (props) => {
  const show = props.keystore ? true : false;
  const passphraseDisabled = props.keystore ? '' : 'disabled';
  
  return (
    <FormControl className="KeystoreUploader-formcontrol">
      <InputLabel
        htmlFor='passphrase'
        children='Enter passphrase to unlock the wallet'
        shrink={show}
        focused={show}/>
      <Input
        type='password'
        className="input-secret"
        fullWidth={true}
        id='password'
        autoFocus={true}
        value={props.passpharse}
        onChange={props.handleChange}
        disabled={passphraseDisabled}/>
      <Actions
        dragDisabled={props.dragDisabled}
        enableDrag={props.enableDrag}
        disabled={props.buttonSubmitDisabled}
        unlockWallet={props.unlockWallet}/>
    </FormControl>
  );
};
