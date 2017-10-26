// @flow weak
import React, {Component} from 'react';
import {Warnings} from '../Common/Warnings';
import {finalizeAuction} from '../../lib/ensService';
import {sendRawTransaction} from '../../lib/dAppService';
import {FinalizeAuctionInfo} from './FinalizeAuctionInfo';
import {FinalizeAuctionForm} from './FinalizeAuctionForm';
import './FinalizeAuction.css';

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
export class FinalizeAuction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      finalFormSent: '',
      warningOpen: false,
      warningMessage: ''
    }

    this.setFinalFormSent = this.setFinalFormSent.bind(this);
    this.handleWarningMessageClose = this.handleWarningMessageClose.bind(this);
    this.handleWarningMessageOpen = this.handleWarningMessageOpen.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
      // 1. not yet refactoring error message
      // 2. add set result data(like txhash) from input result if needed
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
      {...this.state}
      setFinalFormSent={this.setFinalFormSent}
      handleFormSubmit={this.handleFormSubmit}
    />
  )

  render() {
    const finalizeAuctionPage = this.state.finalFormSent === 'sent' ?
      this.finalizeAuctionInfo() :
      this.finalizeAuctionForm();

    const warnings =
      <Warnings
        warningOpen={this.state.warningOpen}
        warningMessage={this.state.warningMessage}
        handleWarningMessageClose={this.handleWarningMessageClose}
      />

    return(
      <div>
        {finalizeAuctionPage}        
        {warnings}
      </div>
    )
  }
}
