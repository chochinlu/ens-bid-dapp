// @flow weak
import React, {Component} from 'react';
import {RevealAuctionForm} from './RevealAuctionForm';
import {RevealAuctionInfo} from './RevealAuctionInfo';
import {unsealBid} from '../../lib/ensService';
import './RevealAuction.css';

export class RevealAuction extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
  }

  handelRevealFormSubmit(event) {
    event.preventDefault();
    const {ethBid, secret} = this.state;
    const privateKey = this.props.privateKey;
    let txHash = '';
    let component = this;
    unsealBid(
      this.props.searchResult.searchName, ethBid,
      secret, privateKey
    ).then(function(result) {
      txHash = result;
      component.setRevealTXHash(txHash);
      component.setRevealFormSent('sent');
    }); 
  }

  revealAuctionForm = () => (
    <RevealAuctionForm
      {...this.props}
      endsAt={this.state.endsAt}
      setRevealFormSent={this.setRevealFormSent}
      setRevealTXHash={this.setRevealTXHash}
      handleInputChange={this.handleInputChange}
      handelRevealFormSubmit={this.handelRevealFormSubmit}
    />
  );

  revealAutionInfo = () => (
    <RevealAuctionInfo
      {...this.state}
      {...this.props}
    />
  );

  render = () => this.state.revealFormSent === 'sent' ?
  this.revealAutionInfo() : this.revealAuctionForm();
}