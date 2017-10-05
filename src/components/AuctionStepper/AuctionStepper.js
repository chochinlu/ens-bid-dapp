import React from 'react';
import classNames from 'classnames/bind';
import './AuctionStepper.css';

const Step = (props) => {
  let stepStyle = classNames('Step', props.currentStep === props.name ? 'Light' : 'Dark');

  return (
    // TODO
    // this is for temporary testing step change
    <div className={stepStyle}
         onClick={()=> props.setStep(props.name)} >
      <i className="material-icons">arrow_forward</i>
      <div className='StepNumber'>
        <div>
          {props.index + 1}
        </div>
      </div>
      <div>{props.title}</div>
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
          currentStep={props.step}
          {...step}
          setStep={props.setStep}
        />
      )}
    </div>
  );
};