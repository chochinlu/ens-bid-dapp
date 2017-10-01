import React, { Component } from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './AuctionStepper.css';

class AuctionStepper extends React {
  state = {
    finished: false,
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Start Auction';
      case 1:
        return 'Reveal Bid';
      case 2:
        return 'Finalize';
      default:
        return 'Finished';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;

    return (
      <div>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Start Auction</StepLabel>
          </Step>
          <Step>
            <StepLabel>Reveal Bid</StepLabel>
          </Step>
          <Step>
            <StepLabel>Finalize</StepLabel>
          </Step>
        </Stepper>
      </div>
    );
  };
};

export default AuctionStepper;