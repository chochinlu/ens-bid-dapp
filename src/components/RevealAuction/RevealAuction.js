// @flow weak
import React, {Component} from 'react';
import {Warnings} from '../Common/Warnings';
import {RevealAuctionForm} from './RevealAuctionForm';
import {RevealAuctionInfo} from './RevealAuctionInfo';
import {sealedBids, unsealBid} from '../../lib/ensService';
import {sendRawTransaction} from '../../lib/dAppService';
import './RevealAuction.css';

const handleRevealAuctionProcess = async (inputObj) => {
  const {domainName, ethBid, secret, privateKey, gas} = inputObj;
  let returnObj = {
    txHash: '',
    errMsg: undefined
  }

  const checkValue = sealedBids(domainName, ethBid, secret, privateKey);
  if (checkValue === '0x0000000000000000000000000000000000000000') {
    return returnObj.errMsg = "Invalid sealed bids";
  }

  const payload = unsealBid(domainName, ethBid, secret, privateKey, gas);
  try {
    returnObj.txHash = await sendRawTransaction(payload);
  } catch (error) {
    returnObj.errMsg = `unsealBid error : ${error}`;
  }

  return returnObj;
}

export class RevealAuction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      revealFormSent: '',
      revealTXHash: '',
      warningOpen: false,
      warningMessage: ''
    }
    this.setRevealFormSent = this.setRevealFormSent.bind(this);
    this.setRevealTXHash = this.setRevealTXHash.bind(this);
    this.handelRevealFormSubmit = this.handelRevealFormSubmit.bind(this);
    this.handleWarningMessageClose = this.handleWarningMessageClose.bind(this);
    this.handleWarningMessageOpen = this.handleWarningMessageOpen.bind(this);
  }

  setRevealFormSent(state) {
    this.setState({revealFormSent: state})
  }

  setRevealTXHash(txHash) {
    this.setState({revealTXHash: txHash})
  }

  handelRevealFormSubmit(inputResult) {
    if (!(this.props.address && this.props.privateKey)) {
      this.handleWarningMessageOpen('Please unlock wallet before bid ENS.');
      return;
    }

    const {ethBid, secret, gas} = inputResult;
    const inputObj = {
      domainName: this.props.searchResult.searchName,
      privateKey: this.props.privateKey,
      ethBid,
      secret,
      gas
    }

    handleRevealAuctionProcess(inputObj).then((result) => {
      if (result.errMsg === undefined) {
        this.setRevealTXHash(result.txHash);
        this.setRevealFormSent('sent');  
      } else {
        // TODO
        // not yet refactoring error message
        this.handleWarningMessageOpen(result.errMsg);
      }
    });
  }

  handleWarningMessageClose() {
    this.setState({warningOpen: false});
  }

  handleWarningMessageOpen(msg) {
    this.setState({warningOpen: true, warningMessage: msg});
  }

  revealAuctionForm = () => (
    <RevealAuctionForm
      {...this.props}
      {...this.state}
      setRevealFormSent={this.setRevealFormSent}
      setRevealTXHash={this.setRevealTXHash}
      handleInputChange={this.handleInputChange}
      handelRevealFormSubmit={this.handelRevealFormSubmit}
      handleWarningMessageOpen={this.handleWarningMessageOpen}
    />
  );

  revealAutionInfo = () => (
    <RevealAuctionInfo
      {...this.state}
      {...this.props}
    />
  );

  render() { 
    const revealAuctionPage = this.state.revealFormSent === 'sent' ?
      this.revealAutionInfo() :
      this.revealAuctionForm();

    const warnings =
      <Warnings
        warningOpen={this.state.warningOpen}
        warningMessage={this.state.warningMessage}
        handleWarningMessageClose={this.handleWarningMessageClose}
      />;

    return(
      <div>
        {revealAuctionPage}
        {warnings}
      </div>
    );
  }
}