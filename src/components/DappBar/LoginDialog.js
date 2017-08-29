import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import { JsonKeyUploader } from '../JsonKeyUploader';
import {MetaMaskWallet} from '../MetaMaskWallet/MetaMaskWallet';

export const LoginDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      transition={Slide}
      onRequestClose={props.onRequestClose}>
      <DialogTitle>
        {"Your wallet: "}
      </DialogTitle>
      <DialogContent>
        <MetaMaskWallet />
        <DialogContentText>
          Or you can upload your keystore file. We will not backup your keystore in database. Please take care your file:
        </DialogContentText>
        <JsonKeyUploader/>
      </DialogContent>
    </Dialog>
  );
};