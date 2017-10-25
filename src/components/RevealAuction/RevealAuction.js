// @flow weak
import React, {Component} from 'react';
import {Warnings} from '../Common/Warnings';
import {RevealAuctionForm} from './RevealAuctionForm';
import {RevealAuctionInfo} from './RevealAuctionInfo';
import {sealedBids, unsealBid} from '../../lib/ensService';
import {sendRawTransaction} from '../../lib/dAppService';
import './RevealAuction.css';

const handleRevealAuctionProcess = async (inputObject) => {
  const {domainName, ethBid, secret, privateKey, gas} = inputObject;
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
      email: '',
      ethBid: '',
      secret: '',
      gas: '21',
      revealFormSent: '',
      revealTXHash: '',
      warningOpen: false,
      warningMessage: ''
    }
    this.setRevealFormSent = this.setRevealFormSent.bind(this);
    this.setRevealTXHash = this.setRevealTXHash.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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

  handleInputChange(event) {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
  }

  handelRevealFormSubmit(event) {
    event.preventDefault();

    if (!(this.props.address && this.props.privateKey)) {
      this.handleWarningMessageOpen('Please unlock wallet before bid ENS.');
      return;
    }

    const inputObject = {
      domainName: this.props.searchResult.searchName,
      ethBid:     this.state.ethBid,
      secret:     this.state.secret,
      privateKey: this.props.privateKey,
      gas:        this.state.gas
    }

    handleRevealAuctionProcess(inputObject).then((result) => {
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
      endsAt={this.state.endsAt}
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
    return(
      <div>
        {this.state.revealFormSent === 'sent' ? this.revealAutionInfo() : this.revealAuctionForm()}
        <Warnings
          warningOpen={this.state.warningOpen}
          warningMessage={this.state.warningMessage}
          handleWarningMessageClose={this.handleWarningMessageClose}
        />
      </div>
    );
  }
}