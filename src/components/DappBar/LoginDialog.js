import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import { JsonKeyUploader } from '../JsonKeyUploader';

export const LoginDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      transition={Slide}
      onRequestClose={props.onRequestClose}>
      <DialogTitle>
        {"Upload your keystore file in JSON format"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          We will not backup your keystore in database. Please take care your file.
        </DialogContentText>
        <JsonKeyUploader/>
      </DialogContent>
    </Dialog>
  );
};