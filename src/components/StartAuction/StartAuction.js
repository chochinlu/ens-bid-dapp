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

const handleStartAuctionProcess = async (inputObject) => {
  const state       = inputObject.state;
  const domainName  = inputObject.domainName;
  const ethBid      = inputObject.ethBid;
  const secret      = inputObject.secret;
  const privateKey  = inputObject.privateKey;
  const gas         = inputObject.gas;

  let returnObj = {
    txHash: '',
    errMsg: undefined
  }

  const payload = (state === 'Auction') ? 
    newBid(domainName, ethBid, secret, privateKey, gas) :
    startAuctionAndBid(domainName, ethBid, secret, privateKey, gas)

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
      email: '',
      ethBid: '',
      secret: '',
      gas: '21',
      auctionFormSent: '',
      auctionTXHash: '',
      message: '',
      checked: false,
    }
    this.setAuctionTXHash = this.setAuctionTXHash.bind(this);
    this.setAuctionFormSent = this.setAuctionFormSent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAuctionFormSubmit = this.handleAuctionFormSubmit.bind(this);
    this.handleAcceptTerms = this.handleAcceptTerms.bind(this);
  }

  setAuctionTXHash(txHash) {
    this.setState({auctionTXHash: txHash})
  }

  setAuctionFormSent(state) {
    this.setState({auctionFormSent: state})
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    
    this.setState({
      [name]: value
    });
  }

  handleMessageOpen = msg => {
    this.setState({ open: true, message: msg });
  };

  handleMessageClose = () => {
    this.setState({ open: false });
  };

  handleAcceptTerms = () => {
    (this.state.checked === true) ?
      this.setState({ checked: false }) :
      this.setState({ checked: true });
  }; 
  
  handleAuctionFormSubmit(event) {
    event.preventDefault();

    if (!(this.props.address && this.props.privateKey)) {
      this.handleMessageOpen('Please unlock wallet before bid ENS.');
      return;
    }

    const inputObject = {
      state:      this.props.searchResult.state,
      domainName: this.props.searchResult.searchName,
      ethBid:     this.state.ethBid,
      secret:     this.state.secret,
      privateKey: this.props.privateKey,
      gas:        this.state.gas
    }
    const resultObj = handleStartAuctionProcess(inputObject);

    if (resultObj.errMsg === undefined) {
      this.setAuctionTXHash(resultObj.txHash);
      this.setAuctionFormSent('sent');  
    } else {
      // TODO
      // not yet refactoring error message
      this.handleMessageOpen(resultObj.errMsg);
    }
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
        setAuctionFormSent={this.setAuctionFormSent}
        setAuctionTXHash={this.setAuctionTXHash}
        handleInputChange={this.handleInputChange}
        handleAcceptTerms={this.handleAcceptTerms}
        handleAuctionFormSubmit={this.handleAuctionFormSubmit}
        handleMessageOpen={this.handleMessageOpen}
      />
    );
  }

  render() {
    return (
      <div>
        {this.startAuctionPage()}
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
      </div>
    );
  }
}