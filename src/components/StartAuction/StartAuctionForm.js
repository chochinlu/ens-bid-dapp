import React, {Component} from 'react';
import { FormControlLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import {TimeDuration} from './TimeDuration';
import {StartAuctionConfirmDiaglog} from './StartAutionConfirmDialog';
import './StartAuctionForm.css';

const EmailTextField = (props) => (
  <TextField
    id='email'
    name='email'
    label='Email'
    value={props.value}
    onChange={props.onChange}
    margin='normal'
    placeholder='youremail@example.com'
    helperText='The bid information will send to this email'
  />
);

const EthBidTextField = (props) => (
  <TextField
    error={props.error}
    id='ethBid'
    name='ethBid'
    label='ETH'
    value={props.value}
    onChange={props.onChange}
    margin='normal'
    placeholder='0.01'
    helperText='Bid amount'
  />
);

const SecretTextField = (props) => (
  <TextField
    id="secret"
    name="secret"
    label="Secret"
    value={props.value}
    onChange={props.onChange}
    margin='normal'
    placeholder='0.0'
    helperText='Please protect your bid with random numbers and characters'
  />
);

//TODO: need more than 1 GWei
const GasTextField = (props) => (
  <TextField
    id='gas'
    name='gas'
    label='Gas Price'
    type='number'
    value={props.value}
    onChange={props.onChange}
    margin='normal'
    helperText='Recommend use 21 Gwei'
  />
);

const ConfirmTermsCheckBox = (props) => (
  <FormControlLabel
    className='StartAuctionForm-terms'
    control={
      <Checkbox
        checked={props.checked}
        onChange={props.onChange}
        value='checked'
      />
    }
    label='I understand how the process works and my risks and responsibilities involved.'
  />
);

const FormSubmit = (props) => (
  <div className='StartAuctionForm-submit'>
    <Button
      raised
      label='Dialog'
      onClick={this.handleOpen} >
      Confirm Submit
    </Button>
  </div>
);
export class StartAuctionForm extends Component {
  state = {
    open: false,
  };

  handleOpen = () => this.props.address && this.props.privateKey
    ? this.setState({open: true}) 
    : this.props.handleMessageOpen('Please Unlock Wallet First.');

  handleClose = () => this.setState({open: false});

  textFields = () => (
        <div className="StartAuctionForm-field">
      <EmailTextField 
            value={this.props.email}
            onChange={this.props.handleInputChange}
          />
      <EthBidTextField 
        error={this.state.ethBidErr}
            value={this.props.ethBid}
        onChange={this.handleInputChange}
          />
      <SecretTextField 
            value={this.props.secret}
            onChange={this.props.handleInputChange}
          />
      <GasTextField 
            value={this.props.gas}
            onChange={this.props.handleInputChange}
          />
      <ConfirmTermsCheckBox 
                checked={this.props.checked}
                onChange={this.props.handleAcceptTerms}
          />
        </div>
  );

  render() {
    const domainName = <h2>{this.props.searchResult.searchName}.eth</h2>;

    const timeDuration =  this.props.searchResult.state === 'Auction' && 
      <TimeDuration {...this.props} />;
    
    const testFields = this.textFields();

    const startAuctionConfirmDiaglog = this.state.open &&
          <StartAuctionConfirmDiaglog
            {...this.props}
            open={this.state.open}
            handleClose={this.handleClose}
      />;

    return (
      <div className="StartAuctionForm">
        {domainName}
        {timeDuration}
        {testFields}
        <FormSubmit onClick={this.handleOpen} />
        {startAuctionConfirmDiaglog}
      </div>
    );
  };
};