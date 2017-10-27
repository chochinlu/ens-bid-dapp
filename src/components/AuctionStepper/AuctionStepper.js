import React from 'react';
import classNames from 'classnames/bind';
import './AuctionStepper.css';

const Step = (props) => {
  const stepClass = classNames('Step', 
    props.currentStep === props.name ? 'current' : 'not-current'
  );
  
  return (
    <div className={stepClass}>
      <h4>{props.title}</h4>
    </div>
  );
}

export const AuctionStepper = (props) => {
  const steps = [
    {name: 'StartAuction', title: 'Start an Auction'},
    {name: 'RevealAuction', title: 'Reveal the Auction'},
    {name: 'FinalizeAuction', title: 'End the Auction'}
  ];

  return (
    <div className='Stepper'>
      {steps.map((step, index) => 
        <Step
          key={`step-${index}`}
          index={index}
          {...step}
          currentStep={props.step}
          setStep={props.setStep}
        />
      )}
    </div>
  );
};