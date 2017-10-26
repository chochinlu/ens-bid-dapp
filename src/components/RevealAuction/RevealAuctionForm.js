import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {momentFromNow} from '../../lib/util';
import {sealedBids} from '../../lib/ensService';
import {RevealAuctionConfirmDialog} from './RevealAuctionConfirmDialog';
import './RevealAuctionForm.css';

const EmailTextField = (props) => (
  <TextField
    id="email"
    name="email"
    label="Email"
    value={props.value}
    onChange={props.onChange}
    margin="normal"
    placeholder="youremail@example.com"
    helperText="The bid information will send to this email"
  />
);

const EthBidTextField = (props) => (
  <TextField
    error={props.error}
    id="ethBid"
    name="ethBid"
    label="ETH"
    value={props.value}
    onChange={props.onChange}
    margin="normal"
    placeholder="0.01"
    helperText={props.error ? props.errMsg : 'Bid amount'}
  />
);

const SecretTextField = (props) => (
  <TextField
    error={props.error}
    id="secret"
    name="secret"
    label="Secret"
    value={props.value}
    onChange={props.onChange}
    margin="normal"
    placeholder="pass phrase"
    helperText={props.error ? props.errMsg :"Please protect your bid with random numbers and characters"}
  />
);

const GasTextField = (props) => (
  <TextField
    error={props.error}
    id="gas"
    name="gas"
    label="Gas Price (Gwei)"
    type="number"
    value={props.value}
    onChange={props.onChange}
    margin="normal"
    helperText={props.error ? props.errMsg : "Recommend use 21 Gwei"}
  />
);

const ConfirmFormSubmit = (props) => (
  <div className="RevealAuctionForm-submit">
    <Button
      raised
      label="Dialog"
      disabled={props.disabled}
      onClick={props.handleOpen}
    >
      Confirm Submit
    </Button>
  </div>
);

const FormComponent = (props) => (
  <div className="RevealAuctionForm">
    <div className="RevealAuctionForm-field">
      <EmailTextField
        value={this.props.email}
        onChange={this.props.handleInputChange}
      />
      <EthBidTextField
        error={this.state.ethBidErr}
        errMsg={this.state.ethBidErrMsg}
        value={this.state.ethBid}
        onChange={this.handleInputChange}
      />
      <SecretTextField
        error={this.state.secretErr}
        errMsg={this.state.secretErrMsg}
        value={this.state.secret}
        onChange={this.handleInputChange}
      />
      <GasTextField
        error={this.state.gasErr}
        errMsg={this.state.gasErrMsg}
        value={this.state.gas}
        onChange={this.handleInputChange}
      />
    </div>
    <ConfirmFormSubmit
      onClick={props.handleOpen}
      disabled={props.submitDisabled}
    />
  </div>
);

export class RevealAuctionForm extends Component {
  state = {
    open: false,
    email: '',
    ethBid: '0.01',
    ethBidErr: false,
    ethBidErrMsg: '',
    secret: '0',
    secretErr: false,
    secretErrMsg: '',
    gas: '21',
    gasErr: false,
    gasErrMsg: ''
  };

  handleOpen = () => {
    if (!(this.props.address && this.props.privateKey)) {
      this.props.handleWarningMessageOpen("Should login first");
      return
    }

    const checkValue = sealedBids(
      this.props.searchResult.searchName,
      this.props.ethBid,
      this.props.secret,
      this.props.privateKey
    );
    if (checkValue === '0x0000000000000000000000000000000000000000') {
      this.props.handleWarningMessageOpen("Invalid sealed bids");
      return
    }

    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleInputChange(event) {
    const {name, value} = event.target;

    this.setState({ [name]: value });
  }

  submitDisabled = () => {
    const {ethBidErr, secretErr, gasErr} = this.state;
    return ethBidErr || secretErr || gasErr;
  }

  render() {
    const domainName = <h2>{this.props.searchResult.searchName}.eth</h2>;
    const timeDuration = (
      <div>
        <div>
          <p>Reveal Auction On</p>
          <div>{this.props.unsealStartsAt.toString()}</div>
          <div>{momentFromNow(this.props.unsealStartsAt).toString()}</div>
        </div>
        <div>
          <p>Finalize Auction On</p>
          <div>{this.props.registratesAt.toString()}</div>
          <div>{momentFromNow(this.props.registratesAt).toString()}</div>
        </div>
      </div>
    );
    const revealAuctionConfirmDialog = 
      (this.state.open && this.props.address && this.props.privateKey) &&
        <RevealAuctionConfirmDialog
          {...this.props}
          open={this.state.open}
          handleClose={this.handleClose}
        />;
      
    return (
      <div>
        {domainName}
        {timeDuration}
        <FormComponent 
          {...this.props}
          handleOpen={this.handleOpen}
          submitDisabled={this.submitDisabled}
        />
        {revealAuctionConfirmDialog}
        {revealAuctionConfirmDialog}
      </div>
    );
  }
};
