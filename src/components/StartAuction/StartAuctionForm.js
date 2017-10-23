import React, {Component} from 'react';
import {momentFromNow} from '../../lib/util';
import {
  startAuctionAndBid,
  newBid, getRegistrarAddress
} from '../../lib/ensService';
import {getEstimateGas, getTransactionFee} from '../../lib/dAppService';

import { FormControlLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';

import './StartAuctionForm.css';

const TimeDuration = (props) => (
  <div>
    <div>
      <p>Reveal Bids On</p>
      <div>{props.unsealStartsAt.toString()}</div>
      <div>{()=>{momentFromNow(props.unsealStartsAt).toString()}}</div>
    </div>
    <div>
      <p>Auction Finalizes On</p>
      <div>{props.registratesAt.toString()}</div>
      <div>{()=>{momentFromNow(props.registratesAt).toString()}}</div>
    </div>
  </div>
);

const StartAuctionConfirmDiaglog = (props) => {
  const payload = (props.state === 'Open') ? 
    startAuctionAndBid(
      props.searchResult.searchName,
      props.ethBid, props.secret, props.privateKey,
      props.gas
    ) :
    newBid(
      props.searchResult.searchName,
      props.ethBid, props.secret, props.privateKey,
      props.gas
    )

  const FormInfo = {
    From: `${props.address}`,
    To:   getRegistrarAddress(),
    Fee:  `${getTransactionFee(props.gas, getEstimateGas(payload))} ETH`,
    ETH:  `${props.ethBid} ETH`,
  }

  return (
    <Dialog open={props.open} onRequestClose={props.handleClose}>
      <DialogTitle>Confirm auction bid information</DialogTitle>
      <DialogContent>
        <List>
          {
            Object.keys(FormInfo).map((key, index) =>(
              <ListItem>
                <ListItemText primary={key} />
                <ListItemText primary={FormInfo[key]} />
              </ListItem>    
            ))
          }
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>
          Cancel
        </Button>
        <Button
          keyboardFocused={true}
          disabled={!props.checked}
          onClick={props.handleAuctionFormSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export class StartAuctionForm extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    (this.props.address && this.props.privateKey) ?
      this.setState({open: true}) :
      this.props.handleMessageOpen("Should login first")
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <div className="StartAuctionForm">
        <h2>{this.props.searchResult.searchName}.eth</h2>
        { this.props.searchResult.state === 'Auction' && <TimeDuration {...this.props} /> }
        <div className="StartAuctionForm-field">
          <TextField
            id="email"
            name="email"
            label="Email"
            value={this.props.email}
            onChange={this.props.handleInputChange}
            margin="normal"
            placeholder="youremail@example.com"
            helperText="The bid information will send to this email"
          />
          <TextField
            id="ethBid"
            name="ethBid"
            label="ETH"
            value={this.props.ethBid}
            onChange={this.props.handleInputChange}
            margin="normal"
            placeholder="0.01"
            helperText="Bid amount"
          />
          <TextField
            id="secret"
            name="secret"
            label="Secret"
            value={this.props.secret}
            onChange={this.props.handleInputChange}
            margin="normal"
            placeholder="passphrase"
            helperText="Please protect your bid with random numbers and characters"
          />
          {/* not lower than 1 Gwei */}
          <TextField
            id="gas"
            name="gas"
            label="Gas Price"
            type="number"
            value={this.props.gas}
            onChange={this.props.handleInputChange}
            margin="normal"
            helperText="Recommend use 21 Gwei"
          />
          <FormControlLabel
            className="StartAuctionForm-terms"
            control={
              <Checkbox
                checked={this.props.checked}
                onChange={this.props.handleAcceptTerms}
                value="checked"
              />
            }
            label="I understand how the process works and my risks and responsibilities involved."
          />
        </div>
        <div className="StartAuctionForm-submit">
          <Button
            raised
            label="Dialog"
            onClick={this.handleOpen} >
            Confirm Submit
          </Button>
        </div>
        { 
          (this.props.address && this.props.privateKey) &&
          <StartAuctionConfirmDiaglog
            {...this.props}
            open={this.state.open}
            handleClose={this.handleClose}
          />
        }
      </div>
    );
  };
};