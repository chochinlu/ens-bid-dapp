import React, { Component } from 'react';
import moment from 'moment';
import {format} from '../../lib/util';
import {AuctionStepper} from '../AuctionStepper/AuctionStepper';
import {StartAuction} from '../StartAuction/StartAuction';
import {RevealAuction} from '../RevealAuction/RevealAuction';
import {FinalizeAuction} from '../FinalizeAuction/FinalizeAuction';
import './AuctionWrapper.css';

export class AuctionWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startsAt: '',
      unsealStartsAt: '',
      registratesAt: ''
    }
  }

  componentDidMount() {
    const registratesAt = format(this.props.searchResult.registrationDate);
    const startsAt = moment(registratesAt).subtract(5, 'days');
    const unsealStartsAt = moment(registratesAt).subtract(2, 'days');
    this.setState({
      startsAt,
      unsealStartsAt,
      registratesAt
    });
  }

  switchStep() {
    switch (this.props.step) {
      case 'StartAuction':
        return (
          <StartAuction
            {...this.state}
            {...this.props}
          />
        );
      case 'RevealAuction':
        return (
          <RevealAuction 
            {...this.state}
            {...this.props}
          />
        );
      case 'FinalizeAuction':
        return (
          <FinalizeAuction
            {...this.state}
            {...this.props}
          />
        );
      default:
        return (
          <StartAuction
            {...this.state}
            {...this.props}
          />
        );
    }
  }

  render() {
    return(
      <div className="AuctionWrapper">
        <AuctionStepper
          {...this.props}
          setStep={this.props.setStep}
        />
        {this.switchStep()}
      </div>
    );
  }
}