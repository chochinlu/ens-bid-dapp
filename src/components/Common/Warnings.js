import React, {Component} from 'react';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';

export const Warnings = (props) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    autoHideDuration={6000}
    open={props.warningOpen}
    onRequestClose={props.handleWarningMessageClose}
    SnackbarContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{props.warningMessage}</span>}
    action={[
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={this.handleWarningMessageClose}>
        <CloseIcon />
      </IconButton>,
    ]}
  />
);
