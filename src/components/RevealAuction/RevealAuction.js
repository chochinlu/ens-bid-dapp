// @flow weak

import React, {Component} from 'react';
import {RevealAuctionForm} from './RevealAuctionForm';
import {RevealAuctionInfo} from './RevealAuctionInfo';
import {unsealBid} from '../../lib/ensService';
import './RevealAuction.css';

export class RevealAuction extends Component {
  // TODO gets startsAt and endsAt time by query
  // the auction data
  constructor(props) {
    super(props)
    this.state = {
      startsAt: '',
      endsAt: '',
      email: '',
      ethdBid: '',
      secret: '',
      gas: '',
      revealFormSent: '',
      revealTXHash: ''
    }
    this.setRevealFormSent = this.setRevealFormSent.bind(this);
    this.setRevealTXHash = this.setRevealTXHash.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handelRevealFormSubmit = this.handelRevealFormSubmit.bind(this);
  }

  setRevealFormSent(state) {
    this.setState({revealFormSent: state})
  }

  setRevealTXHash(txHash) {
    this.setState({revealTXHash: txHash})
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handelRevealFormSubmit(event) {
    event.preventDefault();
    let txHash = unsealBid(
      this.state.email, this.state.ethBid,
      this.state.secret, this.props.privateKey
    )
    this.setRevealTXHash(txHash);
    this.setRevealFormSent('sent');
  }

  revealAuctionPage() {
    if (this.state.revealFormSent === 'sent') {
      return (
        <RevealAuctionInfo
          searchName={this.props.searchResult.searchName}
          switchPage={this.props.switchPage}
          setStep={this.props.setStep}
          {...this.state}
        />
      );
    }

    return (
      <RevealAuctionForm
        {...this.props}
        setRevealFormSent={this.setRevealFormSent}
        setRevealTXHash={this.setRevealTXHash}
        handleInputChange={this.handleInputChange}
        handelRevealFormSubmit={this.handelRevealFormSubmit}
      />
    );
  }

  render() {
    return this.revealAuctionPage();
  }
}