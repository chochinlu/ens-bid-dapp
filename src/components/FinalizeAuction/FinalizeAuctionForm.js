import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {FinalizeAuctionConfirmDialog} from './FinalizeAuctionConfirmDialog';
import {TimeDuration} from './TimeDuration';
import './FinalizeAuctionForm.css';

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

const ConfirmFormSubmit = (props) => (
  <div className='FinalizeAuctionForm-submit'>
    <Button
      raised
      label="Dialog"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      Confirm Submit
    </Button>
  </div>
);

const FormComponent = (props) => (
  <div className='FinalizeAuctionForm-field'>
    {/* <EmailTextField
      value={props.email}
      onChange={props.handleInputChange}
    /> */}
    <GasTextField
      error={props.gasErr}
      errMsg={props.gasErrMsg}
      value={props.gas}
      onChange={props.handleInputChange}
    />
  </div>
);

export class FinalizeAuctionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      email: '',
      gas: '21',
      gasErr: false,
      gasErrMsg: ''
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleOpen = () => {
    if (!(this.props.address && this.props.privateKey)) {
      this.props.handleWarningMessageOpen("Should login first");
      return
    }

    //  TODO
    //  - should validate if the user can finalize the auction
    //  getEstimateGas(payload)

    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleInputChange(event) {
    const {name, value} = event.target;
    this.setState({ [name]: value });

    switch (name) {
      case 'gas':
        this.checkGas(value);
        break;
      default:
        break;
    }
  }

  checkGas = (v) => {
    // validate value should present
    if (v === '') {
      this.setState({
        gasErr: true,
        gasErrMsg: 'Please input a number.'
      })
      return;
    }

    // validate should greater than one
    if (parseFloat(v, 10) <= 1) {
      this.setState({
        gasErr: true,
        gasErrMsg: 'Please input a number large than one'
      })
      return;
    }

    this.setState({
      gasErr: false,
      gasErrMsg: ''
    })
  }

  submitDisabled = () => {
    return this.state.gasErr;
  }

  inputResult = () => ({gas: this.state.gas})

  render() {
    const domainName = <h2>{this.props.searchResult.searchName}.eth</h2>;
    const timeDuraton = <TimeDuration {...this.props} />;
    const finalizeAuctionConfirmDialog = 
      (this.state.open && this.props.address && this.props.privateKey) &&
        <FinalizeAuctionConfirmDialog
          {...this.props}
          inputResult={this.inputResult()}
          open={this.state.open}
          handleClose={this.handleClose}
        />
    const confirmSubmitButton =
      <ConfirmFormSubmit
        onClick={this.handleOpen}
        disabled={this.submitDisabled()}
      />;

    return (
      <div className='FinalizeAuctionForm'>
        {domainName}
        {timeDuraton}
        <FormComponent
          {...this.props}
          {...this.state}
          handleOpen={this.handleOpen}
          handleInputChange={this.handleInputChange}
          submitDisabled={this.submitDisabled}
        />
        {confirmSubmitButton}
        {finalizeAuctionConfirmDialog}
      </div>
    )
  }
};
  
