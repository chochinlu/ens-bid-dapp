import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {sealedBids, finalizeAuction} from '../../lib/ensService';
import {sendRawTransaction} from '../../lib/dAppService';
import {FinalizeAuctionConfirmDialog} from './FinalizeAuctionConfirmDialog';

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
  <div>
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
  <div>
    <div>
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
    <ConfirmFormSubmit
      onClick={props.handleOpen}
      disabled={props.submitDisabled()}
    />
  </div>
);

const handleFinalizeAuctionProcess = async (inputObj) => {
  const {domainName, privateKey, gas} = inputObj;
  let returnObj = {
    txHash: '',
    errMsg: undefined
  }

  const payload = finalizeAuction(domainName, privateKey, gas);
  //  TODO
  //  - should validate if the user can finalize the auction
  //  getEstimateGas(payload)

  try {
    returnObj.txHash = await sendRawTransaction(payload);
  } catch (error) {
    returnObj.errMsg = `finalize auction error : ${error}`;
  }

  return returnObj;
}
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
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
    const {name, vaule} = event.target;
    this.state({ [name]: value });

    switch (name) {
      case 'gas':
        this.checkGas(value);
        break;
      default:
        break;
    }
  }

  handleFormSubmit(inputResult) {
    if (!(this.props.address && this.props.privateKey)) {
      this.handleWarningMessageOpen('Please unlock wallet before bid ENS.');
      return;
    }

    const inputObj = {
      domainName: this.props.searchResult.searchName,
      privateKey: this.props.privateKey,
      gas: inputResult.gas
    }

    handleFinalizeAuctionProcess(inputObj).then((result) => {
      // TODO
      // not yet refactoring error message
      (result.errMsg === undefined) ?
        this.setFinalFormSent('sent') :
        this.handleWarningMessageOpen(result.errMsg);
    });
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
    const timeDuraton = (
      <div>
        <p>Finalize Auction On</p>
        <div>{this.props.registratesAt.toString()}</div>
        <div>Finalization</div>
      </div>
    );
    const finalizeAuctionConfirmDialog = 
      (this.state.open && this.props.address && this.props.privateKey) &&
        <FinalizeAuctionConfirmDialog
          {...this.props}
          inputResult={this.inputResult()}
          open={this.state.open}
          handleClose={this.handleClose}
        />

    return (
      <div>
        {domainName}
        {timeDuraton}
        <FormComponent
          {...this.props}
          {...this.state}
          handleOpen={this.handleOpen}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
          submitDisabled={this.submitDisabled}
        />
        {finalizeAuctionConfirmDialog}
      </div>
    )
  }
};
  
