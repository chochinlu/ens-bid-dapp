import React from 'react';
import Button from 'material-ui/Button';

const ReUploadButton = (props) => {
  return props.dragDisabled ? (
    <Button 
      raised 
      className="KeystoreUploader-button-reupload" 
      disabled={props.disabled}
      onClick={props.enableDrag}>
      Reupload
    </Button>
  ): null;
};

const UnlockButton = (props) => {
  const disabled = props.disabled;
  const classes = disabled ? '': 'KeystoreUploader-button';

  return (
    <Button 
      raised 
      className={classes}
      disabled={disabled}
      onClick={props.unlockWallet}>
      Unlock
    </Button>
  );
}

export const Actions = (props) => (
  <div className="KeystoreUploader-button-container">
    <ReUploadButton {...props} />
    <UnlockButton {...props} />
  </div>
);