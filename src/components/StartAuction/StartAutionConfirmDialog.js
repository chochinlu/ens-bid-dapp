import React from 'react';
import {startAuctionAndBid, newBid, getRegistrarAddress} from '../../lib/ensService';
import {getEstimateGas, getTransactionFee} from '../../lib/dAppService';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Button from 'material-ui/Button';

export const StartAuctionConfirmDiaglog = (props) => {

  const {searchResult: {searchName}, ethBid, secret, privateKey, gas, address, state} = props;
  const {open, handleClose} = props;

  const payload = (state === 'Open')
    ? startAuctionAndBid(searchName, ethBid, secret, privateKey, gas)
    : newBid(searchName, ethBid, secret, privateKey, gas)

  const FormInfo = {
    From: `${address}`,
    To: getRegistrarAddress(),
    "Fee(gasPrice * esitimateGas)": `${getTransactionFee(gas, getEstimateGas(payload))} ETH`,
    ETH: `${ethBid} ETH`
  }

  return (
    <Dialog open={open} onRequestClose={handleClose}>
      <DialogTitle>Confirm auction bid information</DialogTitle>
      <DialogContent>
        <List>
          {Object
            .keys(FormInfo)
            .map((key, index) => (
              <ListItem key={`input-${index}`}>
                <ListItemText primary={key}/>
                <ListItemText primary={FormInfo[key]}/>
              </ListItem>
            ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button
          disabled={!props.checked}
          onClick={props.handleAuctionFormSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};