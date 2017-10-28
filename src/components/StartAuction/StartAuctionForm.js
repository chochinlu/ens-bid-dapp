import React, {Component} from 'react';
import { FormControlLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import {TimeDuration} from './TimeDuration';
import {StartAuctionConfirmDiaglog} from './StartAutionConfirmDialog';
import './StartAuctionForm.css';

// const EmailTextField = (props) => (
//   <TextField
//     id='email'
//     name='email'
//     label='Email'
//     value={props.value}
//     onChange={props.onChange}
//     margin='normal'
//     placeholder='youremail@example.com'
//     helperText='The bid information will send to this email'
//   />
// );

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
    margin='normal'
    placeholder='0.0'
    helperText={props.error ? props.errMsg : 'Protect your bid with random numbers and characters'}
  />
);

const GasTextField = (props) => (
  <TextField
    error={props.error}
    id='gas'
    name='gas'
    label='Gas Price (Gwei)'
    type='number'
    value={props.value}
    onChange={props.onChange}
    margin='normal'
    helperText={props.error ? props.errMsg : 'Recommend use 21 Gwei'}
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

const FormSubmit = (props) => {
  const disabled = props.disabled;
  const classes = !disabled && 'KeystoreUploader-button'

  return (
    <div className='StartAuctionForm-submit'>
      <Button
        className={classes}
        disabled={disabled}
        raised
        label='Dialog'
        onClick={props.onClick} >
        Confirm Submit
      </Button>
    </div>
  );
} 
  

export class StartAuctionForm extends Component {
  state = { 
    open: false,
    email: '',
    ethBid: '0.01',
    secret: '0',
    gas: '21',
    checked: false,
    emailErr: false,
    ethBidErr: false,
    secretErr: false,
    gasErr: false,
    ethBidErrMsg: '',
    secretErrMsg: '',
    gasErrMsg: ''
  };

  handleOpen = () => this.props.address && this.props.privateKey
    ? this.setState({open: true}) 
    : this.props.handleMessageOpen('Please Unlock Wallet First.');

  handleClose = () => this.setState({open: false});

  checkEthBid = (v) => {
    
    //only number
    const reg = /^[+-]?\d+(\.\d+)?$/;
    if (!reg.test(v)) {
      this.setState({
        ethBidErr: true,
        ethBidErrMsg: 'Bid amount: Please input a valid number'
      });
      return;
    } 

    //value !== 0
    if (parseFloat(v, 10) === 0) {
      this.setState({
        ethBidErr: true,
        ethBidErrMsg: 'Bid amount: Please input a non-zero number'
      });
      return;
    }
    
    this.setState({
      ethBidErr: false,
      ethBidErrMsg: ''
    });
  }

  checkSecret = (v) => {
    //not empty
    if (v === '') {
      this.setState({
        secretErr: true,
        secretErrMsg: 'Please input random numbers and characters.'
      });
      return;
    }

    this.setState({
      secretErr: false,
      secretErrMsg: ''
    });
  }

  checkGas = (v) => {
    //not empty
    if (v === '') {
      this.setState({
        gasErr: true,
        gasErrMsg: 'Please input a number.'
      });
      return;
    }

    //value >= 1
    if (parseFloat(v, 10) <= 1) {
      this.setState({
        gasErr: true,
        gasErrMsg: 'Please input a number large than 1'
      });
      return;
    }

    this.setState({
      gasErr: false,
      gasErrMsg: ''
    });

  }

  handleInputChange = (e) => {
    const {name, value} = e.target;
    this.setState({ [name]: value });

    switch (name) {
      case 'ethBid': 
        this.checkEthBid(value);
        break;
      case 'secret':
        this.checkSecret(value);
        break;
      case 'gas':
        this.checkGas(value);
        break;
      default:
    }
  }

  handleAcceptTerms = () => this.setState({checked: !this.state.checked});

  textFields = () => (
    <div className="StartAuctionForm-field">
      {/* <EmailTextField 
        value={this.props.email}
        onChange={this.handleInputChange}
      /> */}
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
      <ConfirmTermsCheckBox 
        checked={this.state.checked}
        onChange={this.handleAcceptTerms}
      />
    </div>
  )

  submitDisabled = () => {
    const {ethBidErr, secretErr, gasErr, checked} = this.state;
    return ethBidErr || secretErr || gasErr || !checked;
  }

  inputResult = () => ({
    email: this.state.email,
    ethBid: this.state.ethBid,
    secret: this.state.secret,
    gas: this.state.gas
  })

  render() {
    const domainName = <h2>{this.props.searchResult.searchName}.eth</h2>;

    const timeDuration =  this.props.searchResult.state === 'Auction' && 
      <TimeDuration {...this.props} />;
    
    const textFields = this.textFields();

    const startAuctionConfirmDiaglog = this.state.open &&
      <StartAuctionConfirmDiaglog
        {...this.props}
        inputResult={this.inputResult()}
        open={this.state.open}
        handleClose={this.handleClose}
      />;

    return (
      <div className="StartAuctionForm">
        {domainName}
        {timeDuration}
        {textFields}
        <FormSubmit onClick={this.handleOpen} disabled={this.submitDisabled()} />
        {startAuctionConfirmDiaglog}
      </div>
    );
  };
};