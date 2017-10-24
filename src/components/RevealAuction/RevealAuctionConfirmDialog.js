import React from 'react';
import {unsealBid, getRegistrarAddress} from '../../lib/ensService';
import {getEstimateGas, getTransactionFee} from '../../lib/dAppService';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import List, {ListItem, ListItemText} from 'material-ui/List';

export const RevealAuctionConfirmDialog = (props) => {

  const {searchResult: {searchName}, ethBid, secret, privateKey, gas, address} = props;
  const {open, handleClose} = props;

  const payload = unsealBid(searchName, ethBid, secret, privateKey, gas);

  const FormInfo = {
    From: `${address}`,
    To: getRegistrarAddress(),
    "Fee(gasPrice * esitimateGas)": `${getTransactionFee(gas, getEstimateGas(payload))} ETH`,
    ETH: `${ethBid} ETH`
  }

  return (
    <Dialog open={open} onRequestClose={handleClose}>
      <DialogTitle>Confirm reveal auction information</DialogTitle>
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
          onClick={props.handelRevealFormSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}