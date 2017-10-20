// @flow weak
import React, {Component} from 'react';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import {StartAuctionForm} from './StartAuctionForm';
import {StartAuctionInfo} from './StartAuctionInfo';
import {startAuctionAndBid, newBid} from '../../lib/ensService';
import './StartAuction.css';

export class StartAuction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      ethBid: '',
      secret: '',
      gas: '',
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

    let component = this;
    let txHash = '';

    if (this.props.searchResult.state === 'Open') {
      startAuctionAndBid(
        this.props.searchResult.searchName, this.state.ethBid,
        this.state.secret, this.props.privateKey
      ).then(function(result) {
        txHash = result;
        component.setAuctionTXHash(txHash);
        component.setAuctionFormSent('sent');
      });
      return;
    }

    if (this.props.searchResult.state === 'Auction') {
      newBid(
        this.props.searchResult.searchName, this.state.ethBid,
        this.state.secret, this.props.privateKey
      ).then(function(result) {
        txHash = result;
        component.setAuctionTXHash(txHash);
        component.setAuctionFormSent('sent');
        return;
      })
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