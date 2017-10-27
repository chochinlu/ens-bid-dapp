// @flow weak
import React, {Component} from 'react';
import {startAuctionAndBid, newBid} from '../../lib/ensService';
import {sendRawTransaction} from '../../lib/dAppService';
import {StartAuctionForm} from './StartAuctionForm';
import {StartAuctionInfo} from './StartAuctionInfo';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import './StartAuction.css';

const handleStartAuctionProcess = async (inputObj) => {
  const {state, domainName, ethBid, secret, privateKey, gas} = inputObj;

  let returnObj = {
    txHash: '',
    errMsg: undefined
  }

  const payload = (state === 'Auction') ? 
    newBid(domainName, ethBid, secret, privateKey, gas) :
    startAuctionAndBid(domainName, ethBid, secret, privateKey, gas);

  try {
    returnObj.txHash = await sendRawTransaction(payload);
  } catch (error) {
    returnObj.errMsg = `${state} async error : ${error}`;
  }

  return returnObj;      
};

export class StartAuction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auctionFormSent: '',
      auctionTXHash: '',
      open: false,
      message: '',
      checked: false,
      formResult: {}
    }
    this.setAuctionTXHash = this.setAuctionTXHash.bind(this);
    this.setAuctionFormSent = this.setAuctionFormSent.bind(this);
    this.setAuctionFormResult = this.setAuctionFormResult.bind(this);
    this.handleAuctionFormSubmit = this.handleAuctionFormSubmit.bind(this);
  }

  setAuctionTXHash(txHash) {
    this.setState({auctionTXHash: txHash});
  }

  setAuctionFormSent(state) {
    this.setState({auctionFormSent: state});
  }

  setAuctionFormResult(formResult) {
    this.setState({formResult: formResult});
  }

  handleMessageOpen = msg => this.setState({ open: true, message: msg });

  handleMessageClose = () => this.setState({ open: false });
  
  handleAuctionFormSubmit(inputResult) {

    if (!(this.props.address && this.props.privateKey)) {
      this.handleMessageOpen('Please unlock wallet before bid ENS.');
      return;
    }

    const {ethBid, secret, gas} = inputResult;
    const inputObject = {
      state:      this.props.searchResult.state,
      domainName: this.props.searchResult.searchName,
      ethBid,
      secret,
      privateKey: this.props.privateKey,
      gas
    };

    handleStartAuctionProcess(inputObject).then((result) => {
      if (result.errMsg === undefined) {
        this.setAuctionTXHash(result.txHash);
        this.setAuctionFormResult(inputResult);
        this.setAuctionFormSent('sent');
      } else {
        // TODO
        // not yet refactoring error message
        this.handleMessageOpen(result.errMsg);
      }
    });
  }

  startAuctionPage() {
    return (this.state.auctionFormSent === 'sent') ? (
      <StartAuctionInfo
        {...this.props}
        {...this.state}
      />
    ) : (
      <StartAuctionForm
        {...this.props}
        {...this.state}
        handleAuctionFormSubmit={this.handleAuctionFormSubmit}
        handleMessageOpen={this.handleMessageOpen}
      />
    );
  }

  snack() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={6000}
        open={this.state.open}
        onRequestClose={this.handleMessageClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleMessageClose}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }

  render() {
    const startAuctionPage = this.startAuctionPage();
    const snack = this.snack();
    return (
      <div>
        {startAuctionPage}
        {snack}
      </div>
    );
  }
}