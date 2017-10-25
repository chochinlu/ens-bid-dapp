// @flow weak
import React, {Component} from 'react';
import {finalizeAuction} from '../../lib/ensService';
import {sendRawTransaction} from '../../lib/dAppService';
import {FinalizeAuctionInfo} from './FinalizeAuctionInfo';
import './FinalizeAuction.css';

const handleFinalizeAuctionProcess = async (inputObj) => {
  const {domainName, privateKey, gas} = inputObj;
  let returnObj = {
    txHash: '',
    errMsg: undefined
  }

  const payload = finalizeAuction(domainName, privateKey, gas);
  try {
    returnObj.txHash = await sendRawTransaction(payload);
  } catch (error) {
    returnObj.errMsg = `finalize auction error : ${error}`;
  }

  return returnObj;
}

const FinalizeAuctionForm = (props) => (
  <div>
    <h2>{props.searchResult.searchName}.eth</h2>
    <div>
      <p>Finalize Auction On</p>
      <div>{props.registratesAt.toString()}</div>
      <div>Finalization</div>
    </div>
    <div>
      <form onSubmit={props.handleFormSubmit}>
        <div>
          <label>
            Email:
            <input
              name="email"
              type="email"
              placeholder="youremail@example.com"
              value={props.email}
              onChange={props.handleChange}
            />
          </label>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  </div>
);

export class FinalizeAuction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      finalFormSent: '',
      gas: '21',
      warningOpen: false,
      warningMessage: ''
    }

    this.setFinalFormSent = this.setFinalFormSent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleWarningMessageClose = this.handleWarningMessageClose.bind(this);
    this.handleWarningMessageOpen = this.handleWarningMessageOpen.bind(this);
  }

  setFinalFormSent(state) {
    this.setState({finalFormSent: state});
  }

  handleWarningMessageClose() {
    this.setState({warningOpen: false});
  }

  handleWarningMessageOpen(msg) {
    this.setState({warningOpen: true, warningMessage: msg});
  }

  handleChange(event) {
    this.setState({email: event.target.value});
  }

  // only success scenario
  handleFormSubmit(event) {
    event.preventDefault();

    if (!(this.props.address && this.props.privateKey)) {
      this.handleWarningMessageOpen('Please unlock wallet before bid ENS.');
      return;
    }

    const inputObj = {
      domainName: this.props.searchResult.searchName,
      privateKey: this.props.privateKey,
      gas: this.state.gas
    }

    handleFinalizeAuctionProcess(inputObj).then((result) => {
      // TODO
      // not yet refactoring error message
      (result.errMsg === undefined) ?
        this.setFinalFormSent('sent') :
        this.handleWarningMessageOpen(result.errMsg);
    });
  }

  finalizeAuctionInfo = () => (
    <FinalizeAuctionInfo
      searchName={this.props.searchResult.searchName}
      switchPage={this.props.switchPage}
    />
  );

  finalizeAuctionForm = () => (
    <FinalizeAuctionForm
      {...this.props}
      setFinalFormSent={this.setFinalFormSent}
      handleChange={this.handleChange}
      handleFormSubmit={this.handleFormSubmit}
    />
  )

  render = () => this.state.finalFormSent === 'sent' ?
  this.finalizeAuctionInfo() : this.finalizeAuctionForm();
}
