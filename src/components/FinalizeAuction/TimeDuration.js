import React from 'react';
import './TimeDuration.css';

export const TimeDuration = (props) => (
  <div className='Finalize-TimeDuration'>
    <div>Finalize Auction On</div>
    <h3>{props.registratesAt.toString()}</h3>
    <div>Finalization</div>
  </div>
);
