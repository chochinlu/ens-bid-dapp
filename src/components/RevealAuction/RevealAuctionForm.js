import React from 'react';
import classNames from 'classnames/bind';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {momentFromNow} from '../../lib/util';
import './RevealAuctionForm.css';

const FormComponent = (props) => (
  <div className="RevealAuctionForm">
    <div className="RevealAuctionForm-field">
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
        value={props.gas}
        onChange={props.handleInputChange}
        margin="normal"
      />
    </div>
    <div className="RevealAuctionForm-submit">
      <Button raised color="primary" onClick={props.handleAuctionFormSubmit}>
        SUBMIT
      </Button>
    </div>
  </div>
);

export const RevealAuctionForm = (props) => {
  const timelineState = classNames(props.duringReveal === 'before' ? '' : 'hidden');

  return (
    <div>
      <h2>{props.searchResult.searchName}.eth</h2>
      <div>
        <div className={timelineState}>
          <p>Reveal Auction On</p>
          <div>{props.unsealStartsAt.toString()}</div>
          <div>{()=>{momentFromNow(props.unsealStartsAt).toString()}}</div>
        </div>
        <div>
          <p>Finalize Auction On</p>
          <div>{props.registratesAt.toString()}</div>
          <div>{()=>{momentFromNow(props.registratesAt).toString()}}</div>
        </div>
      </div>
      { props.duringReveal === 'during' ? 
        <FormComponent {...props} /> : '' }
    </div>
  );
};
