import React from 'react';
import {momentFromNow} from '../../lib/util';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
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

export const StartAuctionForm = (props) => (
  <div className="StartAuctionForm">
    <h2>{props.searchResult.searchName}.eth</h2>
    { props.searchResult.state === 'Auction' && <TimeDuration {...props} /> }
    <div className="StartAuctionForm-field">
      <TextField
        id="email"
        name="email"
        label="Email"
        value={props.email}
        onChange={props.handleInputChange}
        margin="normal"
        placeholder="youremail@example.com"
        helperText="The bid information will send to this email"
      />
      <TextField
        id="ethBid"
        name="ethBid"
        label="ETH"
        value={props.ethBid}
        onChange={props.handleInputChange}
        margin="normal"
        placeholder="0.01"
        helperText="Bid amount"
      />
      <TextField
        id="secret"
        name="secret"
        label="Secret"
        value={props.secret}
        onChange={props.handleInputChange}
        margin="normal"
        placeholder="passphrase"
        helperText="Please protect your bid with random numbers and characters"
      />
      <TextField
        id="gas"
        name="gas"
        label="Gas Price"
        type="number"
        value={props.gas}
        onChange={props.handleInputChange}
        margin="normal"
        helperText="Default use 21 Gwei"
      />
      <FormControlLabel
        className="StartAuctionForm-terms"
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
);