import React from 'react';
import {momentFromNow} from '../../lib/util';

export const TimeDuration = (props) => (
  <div>
    <div>
      <p>Reveal Bids On</p>
      <div>{props.unsealStartsAt.toString()}</div>
      <div>{momentFromNow(props.unsealStartsAt).toString()}</div>
    </div>
    <div>
      <p>Auction Finalizes On</p>
      <div>{props.registratesAt.toString()}</div>
      <div>{momentFromNow(props.registratesAt).toString()}</div>
    </div>
  </div>
);