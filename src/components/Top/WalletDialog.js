import React from 'react';
import Dialog from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import {KeystoreUploader} from '../KeystoreUploader';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import './WalletDialog.css'

export const WalletDialog = (props) => (
  <Dialog
    className="WalletDialog"
    fullScreen
    open={props.walletOpen}
    transition={Slide}>
    <IconButton
      color="primary"
      onClick={props.handleRequestClose}
      aria-label="Close">
      <CloseIcon/>
    </IconButton>
    <div className="WalletDialog-wrapper">
      <KeystoreUploader 
        {...props}
        setAddress={props.setAddress} 
        setKeystore={props.setKeystore}
        setPrivateKey={props.setPrivateKey}
        handleRequestClose={props.handleRequestClose}/>
    </div>
  </Dialog>
);