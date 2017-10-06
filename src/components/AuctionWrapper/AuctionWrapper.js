import React, { Component } from 'react';
import './AuctionWrapper.css';
import {AuctionStepper} from '../AuctionStepper/AuctionStepper';
import {StartAuction} from '../StartAuction/StartAuction';
import {RevealAuction} from '../RevealAuction/RevealAuction';
import {FinalizeAuction} from '../FinalizeAuction/FinalizeAuction';

export class AuctionWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'StartAuction'
    }
    this.setStep = this.setStep.bind(this);
  }

  switchStep() {
    switch (this.state.step) {
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
            setStep={this.setStep}
          />
        );
      case 'FinalizeAuction':
        return <FinalizeAuction />;
      default:
        return <StartAuction />;
    }
  }

  setStep(name) {
    this.setState({step: name});
  }

  render() {
    return(
      <div>
        <AuctionStepper
          {...this.state}
          setStep={this.setStep}
        />
        {this.switchStep()}
      </div>
    );
  }
}