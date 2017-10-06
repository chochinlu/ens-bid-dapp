import React from 'react';
import Button from 'material-ui/Button';

const ReUploadButton = (props) => {
  return props.dragDiabled ? (
    <Button 
      raised 
      className="KeystoreUploader-button-reupload" 
      onClick={props.enableDrag}>
      Reupload
    </Button>
  ): null;
};

const UnlockButton = (props) => (
  <Button 
    raised 
    className="KeystoreUploader-button" 
    onClick={props.unlockWallet}>
    Unlock
  </Button>
);

export const Actions = (props) => (
  <div className="KeystoreUploader-button-container">
    <ReUploadButton {...props} />
    <UnlockButton {...props} />
  </div>
);