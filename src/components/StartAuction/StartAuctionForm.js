import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import './StartAuctionForm.css';

export const StartAuctionForm = (props) => (
  <div className="StartAuctionForm">
    <h2>{props.searchResult.searchName}.eth</h2>
    <div className="StartAuctionForm-field">
      <TextField
        id="email"
        label="Email"
        value={props.email}
        onChange={props.handleInputChange}
        margin="normal"
        placeholder="youremail@example.com"
        helperText="The bid information will send to this email"
      />
      <TextField
        id="ethBid"
        label="ETH"
        value={props.ethBid}
        onChange={props.handleInputChange}
        margin="normal"
        placeholder="0.01"
        helperText="Bid amount"
      />
      <TextField
        id="secret"
        label="Secret"
        value={props.secret}
        onChange={props.handleInputChange}
        margin="normal"
        placeholder="passphrase"
        helperText="Please protect your bid with random numbers and characters"
      />
      <TextField
        id="gas"
        label="Gas Price"
        value={props.gas}
        onChange={props.handleInputChange}
        margin="normal"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={props.checked}
            onChange={props.handleAcceptTerms}
            value="checked"
          />
        }
        label="I understand how the process works and my risks and responsibilities involved."
      />
    </div>
    <div className="StartAuctionForm-submit">
      <Button raised color="primary" onClick={props.handleAuctionFormSubmit} disabled={!props.checked}>
        SUBMIT
      </Button>
    </div>
  </div>
)