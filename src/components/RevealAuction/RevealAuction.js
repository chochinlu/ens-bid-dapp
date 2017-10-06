// @flow weak
import React, {Component} from 'react';
import moment from 'moment'
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
      duringReveal: '',
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

  componentDidMount() {
    // TODO
    // request api to get startsAt and endsAt
    // for instance :
    // const startsAt = moment().add(3, 'days').format('dddd, MMMM D YYYY, h:mm:ss a z');
    // const endsAt = moment().add(6, 'days').format('dddd, MMMM D YYYY, h:mm:ss a z');
    const startsAt = '';
    const endsAt = '';
    this.setState({
      startsAt: startsAt,
      endsAt: endsAt
    })
    const now = moment();
    const beforeStartsAt = moment(now,"dddd, MMMM D YYYY, h:mm:ss a z").diff(moment(startsAt,"dddd, MMMM D YYYY, h:mm:ss a z")) < 0;
    const beforeEndsAt = moment(now,"dddd, MMMM D YYYY, h:mm:ss a z").diff(moment(endsAt,"dddd, MMMM D YYYY, h:mm:ss a z")) < 0;
    let duringReveal = '';

    if (beforeStartsAt && beforeEndsAt) {
      duringReveal = 'before';
    } else if (!beforeStartsAt && beforeEndsAt) {
      duringReveal = 'during';
    } else {
      duringReveal = 'expired';
    }
    
    this.setState({duringReveal: duringReveal});
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
    return this.state.revealFormSent === 'sent' ? (
        <RevealAuctionInfo
          searchName={this.props.searchResult.searchName}
          switchPage={this.props.switchPage}
          setStep={this.props.setStep}
          {...this.state}
        />
      ) : (
        <RevealAuctionForm
          {...this.props}
          duringReveal={this.state.duringReveal}
          startsAt={this.state.startsAt}
          endsAt={this.state.endsAt}
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