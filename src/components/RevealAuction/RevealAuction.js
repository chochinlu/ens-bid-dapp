// @flow weak
import React, {Component} from 'react';
import {Warnings} from '../Common/Warnings';
import {RevealAuctionForm} from './RevealAuctionForm';
import {RevealAuctionInfo} from './RevealAuctionInfo';
import {unsealBid, validateRevealAuctionBid} from '../../lib/ensService';
import {sendRawTransaction, ensJsonExport, getAddressByPrivateKey} from '../../lib/dAppService';
import './RevealAuction.css';

const handleRevealAuctionProcess = async (inputObj) => {
  const {domainName, ethBid, secret, privateKey, gas} = inputObj;
  let returnObj = {
    txHash: '',
    exportJson: '',
    errMsg: undefined
  }

  returnObj.errMsg = validateRevealAuctionBid(domainName, ethBid, secret, privateKey);
  if (returnObj.errMsg !== undefined) return returnObj;

  const payload = unsealBid(domainName, ethBid, secret, privateKey, gas);
  try {
    returnObj.txHash = await sendRawTransaction(payload);
    const address = await getAddressByPrivateKey(privateKey);
    returnObj.exportJson = await ensJsonExport(domainName, ethBid, secret, address);
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
      warningMessage: '',
      formResult: {},
      exportJson: ''
    }
    this.setRevealFormResultState = this.setRevealFormResultState.bind(this);
    this.handelRevealFormSubmit = this.handelRevealFormSubmit.bind(this);
    this.handleWarningMessageClose = this.handleWarningMessageClose.bind(this);
    this.handleWarningMessageOpen = this.handleWarningMessageOpen.bind(this);
  }

  setRevealFormResultState(resultObj) {
    this.setState({
      revealTXHash: resultObj.hash,
      exportJson: resultObj.exportJson,
      revealFormSent: resultObj.state,
      formResult: {
        ethBid: resultObj.inputResult.ethBid,
        secret: resultObj.inputResult.secret
      }
    })
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
        const resultObj = {
          hash: result.txHash,
          exportJson: JSON.stringify(JSON.stringify(result.exportJson)),
          state: 'sent',
          inputResult: {
            ethBid: inputResult.ethBid,
            secret: inputResult.secret,
            gas: inputResult.gas
          }
        };
        this.setRevealFormResultState(resultObj);
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