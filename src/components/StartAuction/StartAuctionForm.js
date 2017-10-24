import React, {Component} from 'react';
import { FormControlLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import {TimeDuration} from './TimeDuration';
import {StartAuctionConfirmDiaglog} from './StartAutionConfirmDialog';
import './StartAuctionForm.css';

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