import React from 'react';
import {startAuctionAndBid, newBid, getRegistrarAddress} from '../../lib/ensService';
import {getEstimateGas, getTransactionFee} from '../../lib/dAppService';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Button from 'material-ui/Button';

export const StartAuctionConfirmDiaglog = (props) => {
  const payload = (props.state === 'Open')
    ? startAuctionAndBid(props.searchResult.searchName, props.ethBid, props.secret, props.privateKey, props.gas)
    : newBid(props.searchResult.searchName, props.ethBid, props.secret, props.privateKey, props.gas)

  const FormInfo = {
    From: `${props.address}`,
    To: getRegistrarAddress(),
    Fee: `${getTransactionFee(props.gas, getEstimateGas(payload))} ETH`,
    ETH: `${props.ethBid} ETH`
  }

  return (
    <Dialog open={props.open} onRequestClose={props.handleClose}>
      <DialogTitle>Confirm auction bid information</DialogTitle>
      <DialogContent>
        <List>
          {Object
            .keys(FormInfo)
            .map((key, index) => (
              <ListItem>
                <ListItemText primary={key}/>
                <ListItemText primary={FormInfo[key]}/>
              </ListItem>
            ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>
          Cancel
        </Button>
        <Button
          keyboardFocused={true}
          disabled={!props.checked}
          onClick={props.handleAuctionFormSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};