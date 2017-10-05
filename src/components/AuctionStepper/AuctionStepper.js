import React, { Component } from 'react';
import './AuctionStepper.css';

const Step = (props) => (
  // TODO
  // this is for temporary testing step change
  <div onClick={()=> props.setStep(props.name) }>
    <div>{props.index + 1}</div>
    <div>{props.title}</div>
  </div>
)

export const AuctionStepper = (props) => {
  const steps = [
    {name: 'StartAuction', title: 'Start an Auction'},
    {name: 'RevealAuction', title: 'Reveal the Auction'},
    {name: 'FinalizeAuction', title: 'End the Auction'}
  ];

  return (
    <div>
      {steps.map((step, index) => 
        <Step
          key={`step-${index}`}
          index={index}
          {...step}
          setStep={props.setStep}
        />
      )}
    </div>
  );
};