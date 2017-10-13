import React, { Component } from 'react';
import './AuctionWrapper.css';
import {AuctionStepper} from '../AuctionStepper/AuctionStepper';
import {StartAuction} from '../StartAuction/StartAuction';
import {RevealAuction} from '../RevealAuction/RevealAuction';
import {FinalizeAuction} from '../FinalizeAuction/FinalizeAuction';

export class AuctionWrapper extends Component {
  switchStep() {
    switch (this.props.step) {
      case 'StartAuction':
        return (
          <StartAuction
            {...this.props}
          />
        );
      case 'RevealAuction':
        return (
          <RevealAuction 
            {...this.props}
          />
        );
      case 'FinalizeAuction':
        return (
          <FinalizeAuction
            {...this.props}
          />
        );
      default:
        return <StartAuction />;
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