import React from 'react';
import {momentFromNow} from '../../lib/util';
import './TimeDuration.css';

export const TimeDuration = (props) => (
  <div className='TimeDuration'>
    <div className='TimeDuration-Reveal'>
      <div>Reveal Auction On</div>
      <h3>{props.unsealStartsAt.toString()}</h3>
      <div>{momentFromNow(props.unsealStartsAt).toString()}</div>
    </div>
    <div className='TimeDuration-Finalize'>
      <div>Finalize Auction On</div>
      <h3>{props.registratesAt.toString()}</h3>
      <div>{momentFromNow(props.registratesAt).toString()}</div>
    </div>
  </div>
);