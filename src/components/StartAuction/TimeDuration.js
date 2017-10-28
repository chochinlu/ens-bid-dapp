import React from 'react';
import {momentFromNow} from '../../lib/util';
import './TimeDuration.css';

export const TimeDuration = (props) => (
  <div className='StartAuctionTimeDuration'>
    <div className='StartAuctionTimeDuration-Reveal'>
      <div>Reveal Bids On</div>
      <h3>{props.unsealStartsAt.toString()}</h3>
      <div>{momentFromNow(props.unsealStartsAt).toString()}</div>
    </div>
    <div className='StartAuctionTimeDuration-Finalize'>
      <div>Auction Finalizes On</div>
      <h3>{props.registratesAt.toString()}</h3>
      <div>{momentFromNow(props.registratesAt).toString()}</div>
    </div>
  </div>
);