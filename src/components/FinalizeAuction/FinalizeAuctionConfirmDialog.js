import React from 'react';
import {finalizeAuction, getRegistrarAddress} from '../../lib/ensService';
import {getEstimateGas, getTransactionFee} from '../../lib/dAppService';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import List, {ListItem, ListItemText} from 'material-ui/List';

export const FinalizeAuctionConfirmDialog = (props) => {
  
  const {searchResult: {searchName}, privateKey, gas, address} = props;
  const {open, handleClose} = props;

  const payload = finalizeAuction(searchName, privateKey, gas);

  const feeString =
    `${gas} Gwei * ${getEstimateGas(payload)} = ${getTransactionFee(gas, getEstimateGas(payload))} ETH`

  const FormInfo = {
    From: `${address}`,
    To: getRegistrarAddress(),
    Fee:  feeString
  }

  return (
    <Dialog open={open} onRequestClose={handleClose}>
      <DialogTitle>Confirm finalize auction information</DialogTitle>
      <DialogContent>
        <List>
          {Object
            .keys(FormInfo)
            .map((key, index) => (
              <ListItem key={`input-${index}`}>
                <ListItemText primary={key} />
                <ListItemText primary={FormInfo[key]} />
              </ListItem>
            ))
          }
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={props.handleFormSubmit(props.inputResult)}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}