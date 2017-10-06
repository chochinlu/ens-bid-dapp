// @flow weak
import React, {Component} from 'react';
import {StartAuctionForm} from './StartAuctionForm';
import {StartAuctionInfo} from './StartAuctionInfo';
import {startAuctionAndBid} from '../../lib/ensService';
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
      auctionTXHash: ''
    }
    this.setAuctionTXHash = this.setAuctionTXHash.bind(this);
    this.setAuctionFormSent = this.setAuctionFormSent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAuctionFormSubmit = this.handleAuctionFormSubmit.bind(this);
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
  
  handleAuctionFormSubmit(event) {
    event.preventDefault();
    let txHash = startAuctionAndBid(
      this.state.email, this.state.ethBid,
      this.state.secret, this.props.privateKey
    )
    this.setAuctionTXHash(txHash);
    this.setAuctionFormSent('sent');
  }

  startAuctionPage() {
    if (this.state.auctionFormSent === 'sent') {
      return (
        <StartAuctionInfo
          searchName={this.props.searchResult.searchName}
          switchPage={this.props.switchPage}
          {...this.state}
        />
      );
    }
    
    return (
      <StartAuctionForm
        {...this.props}
        setAuctionFormSent={this.setAuctionFormSent}
        setAuctionTXHash={this.setAuctionTXHash}
        handleInputChange={this.handleInputChange}
        handleAuctionFormSubmit={this.handleAuctionFormSubmit}
      />
    );
  }

  render() {
    return this.startAuctionPage();
  }
}