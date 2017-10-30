import React from 'react';
import classNames from 'classnames';
import {momentFromNow} from '../../lib/util';
import './TimeDuration.css';

const TimeBlock = (props) => {
  const classes = classNames( 'TimeDuration-block', props.step);
  const title = props.step === 'reveal' 
    ? 'Reveal Bids On'
    : 'Auction Finalizes On';

  return (
    <div className={classes}>
      <p>{title}</p>
      <h3>{props.thisTime.toString()}</h3>
      <p>{momentFromNow(props.thisTime).toString()}</p>
  </div>
  );
};


export const TimeDuration = (props) => (
  <div className='TimeDuration'>
    <TimeBlock step='reveal' thisTime={props.unsealStartsAt} />
    <TimeBlock step='finalize' thisTime={props.registratesAt} />
  </div>
);